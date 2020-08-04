var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Port
server.listen(3000);

// url
app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/index.html');
});

// Array
connections = [];

io.sockets.on('connection', function(socket) {
	console.log("onn");
	connections.push(socket);

	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log("off");
	});

	//send message
	socket.on('send mess', function(data) {
		io.sockets.emit('add mess', {mess: data.mess, name: data.name});
	});

	//listen on typing
	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', {name: data.name});
	});

});



	