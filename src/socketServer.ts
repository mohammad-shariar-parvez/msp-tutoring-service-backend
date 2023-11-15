// socket.ts
import http from "http";
import { Server as SocketIOServer } from 'socket.io';

export const initializeSocket = (server: http.Server) => {
	const io = new SocketIOServer(server);

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
