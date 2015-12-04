var r = require('rethinkdb');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connection = require('./connection');

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

io.on('connection', function(socket) {
	console.log('a user is connected');
});

http.listen(3000, function() {
	console.log('Server is listening on 3000');
});

function start() {
	connection.getConnection(function (err, conn) {
		if (!err) {
			r.db('people_density').table('test1').changes().run(conn, function (err, cursor) {
				if (err) throw err;
				cursor.each(function (err, row) {
					if (err) throw err;
					console.log(JSON.stringify(row, null, 2));
				});
			});
		}
	});
}
