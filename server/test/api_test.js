var expect = require('chai').expect;
var Building = require('../src/Building');
var mongoose = require('mongoose');
var request = require('request');

mongoose.connect('mongodb://localhost:27017/test');

describe('Testing the POST endpoint of API', function() {

	var url;

	before(function() {
		url = 'http://localhost:3000/insert'
	});

	it('Inserting element should increase collection count by one', function(done) {
		this.timeout(5000);
		var postBody = {
			timestamp: '2016-01-08T12:05:15+01:00',
			floors: [
				{
					"name" : "3A",
					"people" : 78,
					"soundLevel" : 20
				},
				{
					"name" : "3B",
					"people" : 50,
					"soundLevel" : 20
				},
				{
					"name" : "3C",
					"people" : 50,
					"soundLevel" : 20
				}
			]
		};

		options = {
			method: 'post',
			body: postBody,
			json: true,
			url: url
		};

		Building.find().count(function(err, countBefore) {
			expect(err).to.equal(null);
			request(options, function(err, res, body) {
				expect(err).to.equal(null);
				expect(res.body).to.equal('Inserted');
				Building.find().count(function(err, countAfter) {
					expect(err).to.equal(null);
					expect(countAfter).to.equal(countBefore+1);
					done();
				});
			});
		});
	});

	it('Inserting without floors should not increase collection count by one', function(done) {
		this.timeout(5000);
		var postBody = {
			timestamp: '2016-01-08T12:05:15+01:00',
		};

		options = {
			method: 'post',
			body: postBody,
			json: true,
			url: url
		};

		Building.find().count(function(err, countBefore) {
			expect(err).to.equal(null);
			request(options, function(err, res, body) {
				expect(err).to.equal(null);
				expect(res.body).to.equal('Error: not inserted');
				Building.find().count(function(err, countAfter) {
					expect(err).to.equal(null);
					expect(countAfter).to.equal(countBefore);
					done();
				});
			});
		});
	});

	it('Inserting without timestamp should not increase collection count by one', function(done) {
		this.timeout(5000);
		var postBody = {
			floors: [
				{
					"name" : "3A",
					"people" : 78,
					"soundLevel" : 20
				},
				{
					"name" : "3B",
					"people" : 50,
					"soundLevel" : 20
				},
				{
					"name" : "3C",
					"people" : 50,
					"soundLevel" : 20
				}
			]
		};

		options = {
			method: 'post',
			body: postBody,
			json: true,
			url: url
		};

		Building.find().count(function(err, countBefore) {
			expect(err).to.equal(null);
			request(options, function(err, res, body) {
				expect(err).to.equal(null);
				expect(res.body).to.equal('Error: not inserted');
				Building.find().count(function(err, countAfter) {
					expect(err).to.equal(null);
					expect(countAfter).to.equal(countBefore);
					done();
				});
			});
		});
	});

	it('Inserting with timestamp as wrong type should not increase collection count by one', function(done) {
		this.timeout(5000);
		var postBody = {
			timestamp: 908,
			floors: [
				{
					"name" : "3A",
					"people" : 78,
					"soundLevel" : 20
				},
				{
					"name" : "3B",
					"people" : 50,
					"soundLevel" : 20
				},
				{
					"name" : "3C",
					"people" : 50,
					"soundLevel" : 20
				}
			]
		};

		options = {
			method: 'post',
			body: postBody,
			json: true,
			url: url
		};

		Building.find().count(function(err, countBefore) {
			expect(err).to.equal(null);
			request(options, function(err, res, body) {
				expect(err).to.equal(null);
				expect(res.body).to.equal('Error: not inserted');
				Building.find().count(function(err, countAfter) {
					expect(err).to.equal(null);
					expect(countAfter).to.equal(countBefore);
					done();
				});
			});
		});
	});

	it('Inserting with floors as wrong type should not increase collection count by one', function(done) {
		this.timeout(5000);
		var postBody = {
			timestamp: '2016-01-08T12:05:15+01:00',
			floors: 'floors'
		};

		options = {
			method: 'post',
			body: postBody,
			json: true,
			url: url
		};

		Building.find().count(function(err, countBefore) {
			expect(err).to.equal(null);
			request(options, function(err, res, body) {
				expect(err).to.equal(null);
				expect(res.body).to.equal('Error: not inserted');
				Building.find().count(function(err, countAfter) {
					expect(err).to.equal(null);
					expect(countAfter).to.equal(countBefore);
					done();
				});
			});
		});
	});





});