const express = require('express')
const app = express()
const port = 3000
const ioClient = require("socket.io-client");

let http = require("http").Server(app);

const io = require('socket.io')(http, {
	cors: {
	  origin: "*",
	  methods: ["GET", "POST"]
	}
});

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

io.on('connection', function(socket) {
    console.log('Client connected...');
	socket.join(socket.handshake.query.userId)

	socket.on("hello", (data) => {
		console.log(data);
	})
	io.to(socket.handshake.query.userId).emit('hello', `to all clients in ${socket.handshake.query.userId} room except sender`);
});

app.set('io', io)

http.listen("3000", function () {
	console.log(`listening on *:${port}`);
});
