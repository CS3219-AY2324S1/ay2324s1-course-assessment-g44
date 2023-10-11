import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { connect } from 'amqplib'; 
import 'dotenv';

const app = express();
const http = createServer(app);

const io =  new Server(http, {
    cors: {origin: "*"}
});

const ampqURL = 'amqps://ctkrippq:VOktAb86Bup5TVgqhHCa1sljcwFUHYSG@armadillo.rmq.cloudamqp.com/ctkrippq';
const PORT = 8002;


app.use(cors());
app.use(express.json());    

app.get('/', (req, res) => {
    res.send('Hello world from matching service');
});

const connection = await connect(ampqURL);
const channel = await connection.createChannel();
const queues = ['Easy', 'Medium', 'Hard'];
queues.forEach((queueName) => {
    channel.assertQueue(queueName, { durable: false });
});

io.on("connection", socket => {
    console.log(`Theres a user connected to ${socket.id}`)
    // Create event listeners here after connection
    socket.on('disconnect', () => {
        console.log(`The user disconnected on ${socket.id}`)
    })

    socket.on('find-match', async (msg) => {
        const parsedMsg = JSON.parse(msg);
        const { user, complexity, category }  = parsedMsg;
        if (!user || !complexity) {
            console.log(`Invalid match request`);
            io.to(socket.id).emit("match-fail", "Missing required args"); //Let socket handle this message "match-fail"
            return;
        }
        // Check queue, handle case where no user waiting in queue or 1 user currently in queue
        // Case 1: no user in queue
        const dequeueMsg = await channel.get(complexity);
        if (!dequeueMsg) {
            const queueMsg = {
                user: user, socketId: socket.id
            };
            console.log("Adding to message queue");
            console.log(queueMsg);

            channel.sendToQueue(complexity, Buffer.from(JSON.stringify(queueMsg)));
        } else {
            // Case 2: User already in queue
            const otherUser = JSON.parse(dequeueMsg.content.toString());
            console.log(otherUser);
        }
    })
})


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});