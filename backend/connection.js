var r = require('rethinkdb');

var connectionObject = {};

// connection object with the localhost rethinkdb
var connection = null;

// function that will return connection with callback
connectionObject.getConnection = function(callback) {
	if (connection !== null) {
		// there is a callback will return it
		return callback(null, connection);
	}
	r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    	if (err) {
				// some error will return with the callback
				callback(err, null);
			} else {
				connection = conn;
				// returning the connection with the callback
				callback(null, connection);
			}
	});
};

// exporting the connectionObject so other modules can use it
module.exports = connectionObject;
