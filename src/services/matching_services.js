import socketIOClient from 'socket.io-client';

const serverURL = "http://localhost:8002"

const setupSocket = () => {
    const socket = socketIOClient(serverURL);

    socket.on('connection', socket => {
        console.log(`Connected on ${socket.id}`);
    })
};

export default setupSocket;