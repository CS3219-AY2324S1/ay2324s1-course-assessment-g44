import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { connect } from 'amqplib'; 
import 'dotenv';
import axios from 'axios';

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
    channel.assertQueue(queueName, { durable: false, messageTtl: 30000 });
});

io.on("connection", socket => {
    console.log(`Theres a user connected to ${socket.id}`)
    // Create event listeners here after connection
    socket.on('disconnect', () => {
        console.log(`The user disconnected on ${socket.id}`)
    });

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
            // console.log(user);
            // This case handles after matching, what to do
            const roomID = generateRoomID();
            const res = await axios.get('http://localhost:3001/routes/getQuestions');
            const questions = res.data;
            const filteredQuestions = questions.filter(question => question.difficulty === complexity.toLowerCase());
    
            if (filteredQuestions.length > 0) {
            // Generate a random index within the range of easyQuestions
            const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    
            // Retrieve the random question
            const randomQuestion = filteredQuestions[randomIndex];
            io.to(socket.id).emit("navigate-to-room", {user: otherUser.user, question: randomQuestion.title, roomID: roomID});
            io.to(otherUser.socketId).emit("navigate-to-room", {user: user, question: randomQuestion.title, roomID: roomID});

            console.log(`Random question with complexity ${complexity}:`, randomQuestion);
            } else {
            console.log(`No questions with complexity ${complexity}  found.`);
            }

        }
    });
    function generateRoomID() {
        // Generate a unique room ID here, e.g., using a random string or an incrementing counter
        // Return the generated room ID
        const roomID = Math.random().toString(36).substring(2, 13);
        return roomID;
    };
});


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});