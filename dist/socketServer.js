"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const initializeSocket = (server) => {
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('notification', (data) => {
            io.emit("newNotification", data);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
exports.initializeSocket = initializeSocket;
