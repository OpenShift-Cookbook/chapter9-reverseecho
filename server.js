var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/',function(req,res){
	res.sendfile(__dirname+'/index.html');
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

server.listen(port,ip);

console.log('App running at http://%s:%d',ip,port);

io.sockets.on('connection', function (socket) {

	// when the client emits 'sendchat', this listens and executes
	socket.on('message', function (data) {
		io.sockets.emit('rev-message', data.split("").reverse().join(""));
	});
});