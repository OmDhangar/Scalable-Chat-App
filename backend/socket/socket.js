import { Server } from "socket.io";
import http from "http";
import express from "express";
import { publisher,subscriber } from "../config/redis.js";
import { createRedisAdapter } from "./redisAdapter.js";

const app = express();


const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

// Add Redis adapter to Socket.IO
io.adapter(createRedisAdapter());

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	//Handle new messages
	socket.on("sendMessage", (message) => {
        // Publish message to Redis
        publisher.publish("chat_messages", JSON.stringify({
            senderId: userId,
            message: message
        }));
			
    });


	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

//subscripe to redis messages
subscriber.subscribe("chat_messages",(err,count)=>{
	if(err) console.error("Redis sunscription error",err);
	console.log(`Subscribed to ${count} channels`);
});

subscriber.on("message",(channel,message)=>{
	if(channel === "chat_message"){
		const parsedMessage = JSON.parse(message);
		io.emit("newMessage",parsedMessage);
		console.log(parsedMessage)
		
	}
})

export { app, io, server };
