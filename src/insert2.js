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
	var firstSection = getRandomNumberBetween(0, 100);
	var secondSection = getRandomNumberBetween(0, 100);
	var thirdSection = getRandomNumberBetween(0, 100);
	var object = getObject();
	object.timeStamp = new Date().toUTCString();
	object.floors[0].People = firstSection;
	object.floors[1].People = secondSection;
	object.floors[2].People = thirdSection;
	object.floors[0].Name = "3A";
	object.floors[1].Name = "3B";
	object.floors[2].Name = "3C";
	object.floors[0].SoundLevel = getValueForSound(firstSection);
	object.floors[1].SoundLevel = getValueForSound(secondSection);
	object.floors[2].SoundLevel = getValueForSound(thirdSection);
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

//This function will return a value for the soundlevel based on the generated randomNumber param.
function getValueForSound(randomNumber){
	return randomNumber / 2;
}

// this function will return a skeleton object that will be used to insert into rethinkdb
function getObject() {
	var jsonObject = {
		timeStamp: undefined,
		floors: [
			{
				"Name": undefined,
				"People": undefined,
				"SoundLevel": undefined
			},
			{
				"Name": undefined,
				"People": undefined,
				"SoundLevel": undefined
			},
			{
				"Name": undefined,
				"People": undefined,
				"SoundLevel": undefined
			}
		]
	};
	return jsonObject;
}
