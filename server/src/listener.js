var r = require('rethinkdb');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var BuildingSchema = require('./Building');

var connection = require('./connection');

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, '../public', 'images', 'mahlogo.png')));

app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

// basic endpoint
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/chart', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'chart.html'));
});

app.post('/insert', function(req, res) {
    var body = req.body;
    if (!validateObject(body)) {
        return res.status(400).send("Error: not inserted");
    }
    var Building = new BuildingSchema(body);
    Building.save(function(err, b) {
        if (err)  {
            return res.status(500).send("Error: not inserted");
        }
    });
    notifyAllClients(Building);
    return res.status(200).send("Inserted");
});

// socket array to keep track of each socket
var sockets = [];

var notifyAllClients = function(Building) {
    for (var i = 0; i < sockets.length; i++) {
     	sockets[i].emit('data', Building);
    }
};

// will handle each client that connects to the server via the basic endpoint
// will add it to the sockets array
io.on('connection', function(socket) {
	console.log('user ' + socket.id + ' is connected');
	sockets.push(socket);
	socket.on('disconnect', function() {
		console.log('user ' + socket.id + ' is disconnected');
		for (var i = 0; i < sockets.length; i++) {
			if (sockets[i].id == socket.id) {
				sockets.splice(i, 1);
				console.log('user ' + socket.id + ' is removed from sockets list');
				break;
			}
		}
	});
});

// this function is validate the json body that should be inserted in MongoDB
var validateObject = function(body) {
    if (!body.hasOwnProperty('floors')) {
        return false;
    }
    if (!body.hasOwnProperty('timestamp')) {
        return false;
    }
    if (typeof body.floors !== 'object') {
        return false;
    }
    if (typeof body.timestamp !== 'string') {
        return false;
    }
    return true;
}

// the server will listening on calls on localhost and port 3000
http.listen(3000, function() {
	console.log('Server is listening on 3000');
});
