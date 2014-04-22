/**
 * Module dependencies.
 */

var express = require('express'), 
        routes = require('./routes'), 
        user = require('./routes/user'), 
        http = require('http'), 
        socketio = require("socket.io"),
        path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

//app.get("*", function(req, res) {
//	console.log("aaa");
//	 res.redirect(__dirname + 'public/first_abc/index.html');
//});


var playRoomList = {
		'room1' : [ 
		            {username: '', isready: false}
		          ]
};


var io = socketio.listen(server);
io.sockets.on("connection", function(socket) {

	io.sockets.emit("roomlist", playRoomList);
	socket.on("adduser", function(data) {
		console.log("adduser username :", data);
		socket.username = data;
	});

	socket.on("createroom", function(data) {
		console.log("createroom :", playRoomList[data.roomname]);
		if(playRoomList[data.roomname] == undefined) {
			var player = {
				username: '',
				isready: true 
			}
			console.log("username :", socket.username);
			player.username = data.username;
			playRoomList[data.roomname] = [];
			playRoomList[data.roomname].push(player);
		} else {
		}
        socket.join(data.roomname);
		io.sockets.emit("roomlist", playRoomList);
        socket.broadcast.to("/" + data.roomname).emit('playgame', playRoomList[data]);
	});
	
	
	socket.on("joinroom", function(data) {
		console.log("joinroom :", playRoomList[data.roomname]);
//		var rooms = io.sockets.manager.rooms;
		if(playRoomList[data.roomname].length > 2) {
			io.sockets.emit("roomlist", playRoomList);
			return;
		}

		socket.join(data.roomname);
        socket.broadcast.to(data.roomname).emit('playgame', playRoomList[data]);
		io.sockets.emit("roomlist", playRoomList);
	});
	
	socket.on("playgame", function(data) {
		switch (data.type) {
			case "start":
				playRoomList[data.roomname][data.username].isReady = true;
				break;
			case "ready":
				break;
			case "steady":
				break;
		}
	});
});
