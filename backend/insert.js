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
	object.floors[0]["3A"].people = getRandomNumberBetween(0, 100);
	object.floors[0]["3B"].people = getRandomNumberBetween(0, 100);
	object.floors[0]["3C"].people = getRandomNumberBetween(0, 100);
	object.floors[0]["3A"].soundLevel = getRandomNumberBetween(0, 50);
	object.floors[0]["3B"].soundLevel = getRandomNumberBetween(0, 50);
	object.floors[0]["3C"].soundLevel = getRandomNumberBetween(0, 50);
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
				"3A": {
					"people": undefined,
					"soundLevel": undefined
				},
				"3B": {
					"people": undefined,
					"soundLevel": undefined
				},
				"3C": {
					"people": undefined,
					"soundLevel": undefined
				}
			}
		]
	};
	return jsonObject;
}
