var r = require('rethinkdb');
var connection = require('./connection');
var rConn = null;
var interval = process.env.INTERVAL;
start();

function start() {
	connection.getConnection(function (err, conn) {
		// if there is an error log it and return
		if (err) return console.error(err);
		rConn = conn;
		insertData();
		if (interval === undefined) {
			interval = 5000;
		}
		setInterval(insertData, interval);
	});
}

// this function will create a new object with random numbers and insert it into rethinkdb
function insertData() {
	var object = getObject();
	object.floors[0].people = getRandomNumberBetween(0, 100);
	object.floors[1].people = getRandomNumberBetween(0, 100);
	object.floors[2].people = getRandomNumberBetween(0, 100);
	object.floors[0].name = "3A";
	object.floors[1].name = "3B";
	object.floors[2].name = "3C";
	object.floors[0].soundLevel = getRandomNumberBetween(0, 50);
	object.floors[1].soundLevel = getRandomNumberBetween(0, 50);
	object.floors[2].soundLevel = getRandomNumberBetween(0, 50);
	object.floors[0].Timestamp = "2016-01-05 15:00:00";
	object.floors[1].Timestamp = "2016-01-05 14:00:00";
	object.floors[2].Timestamp = "2016-01-05 12:00:00";
	r.db('people_density').table('test1').insert(object).run(rConn, function (err, result) {
		if (err) {
			console.error('Couldn\'t insert: ' + err);
		} else {
			console.log('Successfully inserted');
			console.log(result);
		}
	});
}

// this function will return a random number between low and high parameter
function getRandomNumberBetween(low, high) {
	return Math.floor((Math.random() * high) + low);
}

// this function will return a skeleton object that will be used to insert into rethinkdb
function getObject() {
	var jsonObject = {
		floors: [
			{
				"name": undefined,
				"people": undefined,
				"soundLevel": undefined,
				"Timestamp": undefined
			},
			{
				"name": undefined,
				"people": undefined,
				"soundLevel": undefined,
				"Timestamp": undefined
			},
			{
				"name": undefined,
				"people": undefined,
				"soundLevel": undefined,
				"Timestamp": undefined
			}
		]
	};
	return jsonObject;
}
