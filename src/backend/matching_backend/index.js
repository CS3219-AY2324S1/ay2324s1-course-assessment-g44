import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import amqp from 'amqplib/callback_api.js'; 
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

amqp.connect(ampqURL, (error0, connection) => {
    if (error0) {
        throw error0;
    }

    // Create a channel
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        // Define the queues
        const queues = ['Easy', 'Medium', 'Hard'];

        // Ensure the queues exist and are durable
        queues.forEach((queueName) => {
            channel.assertQueue(queueName, { durable: false });
        });
    });
});

io.on("connection", socket => {
    console.log(`Theres a user connected to ${socket.id}`)
    // Create an event listener here on connection
    socket.on('disconnect', () => {
        console.log(`The user disconnected on ${socket.id}`)
    })
})


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});