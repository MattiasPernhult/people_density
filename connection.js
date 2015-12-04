var r = require('rethinkdb');

var connectionObject = {};

var connection = null;

connectionObject.getConnection = function(callback) {
	if (connection != null) {
		return callback(null, connection)
	}
	r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    	if (err) return callback(err, null);
    	connection = conn;
		callback(null, connection);
	})	
};

module.exports = connectionObject;