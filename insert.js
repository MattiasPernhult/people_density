var r = require('rethinkdb');
var connection = require('./connection');

start();

function start() {
	connection.getConnection(function (err, conn) {
		if (err) return console.error(err);
				var object = getObject();
				object.floors[0]["3A"].people =
					getRandomNumberBetween(0, 100);
				object.floors[0]["3B"].people =
					getRandomNumberBetween(0, 100);
				object.floors[0]["3C"].people =
					getRandomNumberBetween(0, 100);
				object.floors[0]["3A"].soundLevel =
					getRandomNumberBetween(0, 50);
				object.floors[0]["3B"].soundLevel =
					getRandomNumberBetween(0, 50);
				object.floors[0]["3C"].soundLevel =
					getRandomNumberBetween(0, 50);
				r.db('people_density').table('test1').insert(object).run(conn,
					function(err, result){
						if (err) {
							console.error('Couldn\'t insert: ' + err);
						} else {
							console.log('Successfully inserted');
							console.log(result);
						}
				});
	});
}

function getRandomNumberBetween(low, high) {
	return Math.floor((Math.random() * high) + low);
}

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
