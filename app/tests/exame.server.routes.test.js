'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Exame = mongoose.model('Exame'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, exame;

/**
 * Exame routes tests
 */
describe('Exame CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Exame
		user.save(function() {
			exame = {
				name: 'Exame Name'
			};

			done();
		});
	});

	it('should be able to save Exame instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Exame
				agent.post('/exames')
					.send(exame)
					.expect(200)
					.end(function(exameSaveErr, exameSaveRes) {
						// Handle Exame save error
						if (exameSaveErr) done(exameSaveErr);

						// Get a list of Exames
						agent.get('/exames')
							.end(function(examesGetErr, examesGetRes) {
								// Handle Exame save error
								if (examesGetErr) done(examesGetErr);

								// Get Exames list
								var exames = examesGetRes.body;

								// Set assertions
								(exames[0].user._id).should.equal(userId);
								(exames[0].name).should.match('Exame Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Exame instance if not logged in', function(done) {
		agent.post('/exames')
			.send(exame)
			.expect(401)
			.end(function(exameSaveErr, exameSaveRes) {
				// Call the assertion callback
				done(exameSaveErr);
			});
	});

	it('should not be able to save Exame instance if no name is provided', function(done) {
		// Invalidate name field
		exame.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Exame
				agent.post('/exames')
					.send(exame)
					.expect(400)
					.end(function(exameSaveErr, exameSaveRes) {
						// Set message assertion
						(exameSaveRes.body.message).should.match('Please fill Exame name');
						
						// Handle Exame save error
						done(exameSaveErr);
					});
			});
	});

	it('should be able to update Exame instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Exame
				agent.post('/exames')
					.send(exame)
					.expect(200)
					.end(function(exameSaveErr, exameSaveRes) {
						// Handle Exame save error
						if (exameSaveErr) done(exameSaveErr);

						// Update Exame name
						exame.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Exame
						agent.put('/exames/' + exameSaveRes.body._id)
							.send(exame)
							.expect(200)
							.end(function(exameUpdateErr, exameUpdateRes) {
								// Handle Exame update error
								if (exameUpdateErr) done(exameUpdateErr);

								// Set assertions
								(exameUpdateRes.body._id).should.equal(exameSaveRes.body._id);
								(exameUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Exames if not signed in', function(done) {
		// Create new Exame model instance
		var exameObj = new Exame(exame);

		// Save the Exame
		exameObj.save(function() {
			// Request Exames
			request(app).get('/exames')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Exame if not signed in', function(done) {
		// Create new Exame model instance
		var exameObj = new Exame(exame);

		// Save the Exame
		exameObj.save(function() {
			request(app).get('/exames/' + exameObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', exame.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Exame instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Exame
				agent.post('/exames')
					.send(exame)
					.expect(200)
					.end(function(exameSaveErr, exameSaveRes) {
						// Handle Exame save error
						if (exameSaveErr) done(exameSaveErr);

						// Delete existing Exame
						agent.delete('/exames/' + exameSaveRes.body._id)
							.send(exame)
							.expect(200)
							.end(function(exameDeleteErr, exameDeleteRes) {
								// Handle Exame error error
								if (exameDeleteErr) done(exameDeleteErr);

								// Set assertions
								(exameDeleteRes.body._id).should.equal(exameSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Exame instance if not signed in', function(done) {
		// Set Exame user 
		exame.user = user;

		// Create new Exame model instance
		var exameObj = new Exame(exame);

		// Save the Exame
		exameObj.save(function() {
			// Try deleting Exame
			request(app).delete('/exames/' + exameObj._id)
			.expect(401)
			.end(function(exameDeleteErr, exameDeleteRes) {
				// Set message assertion
				(exameDeleteRes.body.message).should.match('User is not logged in');

				// Handle Exame error error
				done(exameDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Exame.remove().exec();
		done();
	});
});