import { Navigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const serverURL = "http://localhost:8002"

const setupSocket = (directToRoom) => {
    const socket = socketIOClient(serverURL);

    socket.on('connection', () => {
        console.log(`Connected on ${socket.id}`);
    });

    socket.on('match-success', () => {
        console.log(`Matching successful!`);
    } );

    socket.on('navigate-to-room', (username) => {
        if (directToRoom) {
            directToRoom(username.user);
        }
    });
    return socket;
};

export default setupSocket;