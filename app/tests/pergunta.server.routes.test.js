'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Pergunta = mongoose.model('Pergunta'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, pergunta;

/**
 * Pergunta routes tests
 */
describe('Pergunta CRUD tests', function() {
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

		// Save a user to the test db and create new Pergunta
		user.save(function() {
			pergunta = {
				name: 'Pergunta Name'
			};

			done();
		});
	});

	it('should be able to save Pergunta instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pergunta
				agent.post('/perguntas')
					.send(pergunta)
					.expect(200)
					.end(function(perguntaSaveErr, perguntaSaveRes) {
						// Handle Pergunta save error
						if (perguntaSaveErr) done(perguntaSaveErr);

						// Get a list of Perguntas
						agent.get('/perguntas')
							.end(function(perguntasGetErr, perguntasGetRes) {
								// Handle Pergunta save error
								if (perguntasGetErr) done(perguntasGetErr);

								// Get Perguntas list
								var perguntas = perguntasGetRes.body;

								// Set assertions
								(perguntas[0].user._id).should.equal(userId);
								(perguntas[0].name).should.match('Pergunta Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pergunta instance if not logged in', function(done) {
		agent.post('/perguntas')
			.send(pergunta)
			.expect(401)
			.end(function(perguntaSaveErr, perguntaSaveRes) {
				// Call the assertion callback
				done(perguntaSaveErr);
			});
	});

	it('should not be able to save Pergunta instance if no name is provided', function(done) {
		// Invalidate name field
		pergunta.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pergunta
				agent.post('/perguntas')
					.send(pergunta)
					.expect(400)
					.end(function(perguntaSaveErr, perguntaSaveRes) {
						// Set message assertion
						(perguntaSaveRes.body.message).should.match('Please fill Pergunta name');
						
						// Handle Pergunta save error
						done(perguntaSaveErr);
					});
			});
	});

	it('should be able to update Pergunta instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pergunta
				agent.post('/perguntas')
					.send(pergunta)
					.expect(200)
					.end(function(perguntaSaveErr, perguntaSaveRes) {
						// Handle Pergunta save error
						if (perguntaSaveErr) done(perguntaSaveErr);

						// Update Pergunta name
						pergunta.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pergunta
						agent.put('/perguntas/' + perguntaSaveRes.body._id)
							.send(pergunta)
							.expect(200)
							.end(function(perguntaUpdateErr, perguntaUpdateRes) {
								// Handle Pergunta update error
								if (perguntaUpdateErr) done(perguntaUpdateErr);

								// Set assertions
								(perguntaUpdateRes.body._id).should.equal(perguntaSaveRes.body._id);
								(perguntaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Perguntas if not signed in', function(done) {
		// Create new Pergunta model instance
		var perguntaObj = new Pergunta(pergunta);

		// Save the Pergunta
		perguntaObj.save(function() {
			// Request Perguntas
			request(app).get('/perguntas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pergunta if not signed in', function(done) {
		// Create new Pergunta model instance
		var perguntaObj = new Pergunta(pergunta);

		// Save the Pergunta
		perguntaObj.save(function() {
			request(app).get('/perguntas/' + perguntaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pergunta.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pergunta instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pergunta
				agent.post('/perguntas')
					.send(pergunta)
					.expect(200)
					.end(function(perguntaSaveErr, perguntaSaveRes) {
						// Handle Pergunta save error
						if (perguntaSaveErr) done(perguntaSaveErr);

						// Delete existing Pergunta
						agent.delete('/perguntas/' + perguntaSaveRes.body._id)
							.send(pergunta)
							.expect(200)
							.end(function(perguntaDeleteErr, perguntaDeleteRes) {
								// Handle Pergunta error error
								if (perguntaDeleteErr) done(perguntaDeleteErr);

								// Set assertions
								(perguntaDeleteRes.body._id).should.equal(perguntaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pergunta instance if not signed in', function(done) {
		// Set Pergunta user 
		pergunta.user = user;

		// Create new Pergunta model instance
		var perguntaObj = new Pergunta(pergunta);

		// Save the Pergunta
		perguntaObj.save(function() {
			// Try deleting Pergunta
			request(app).delete('/perguntas/' + perguntaObj._id)
			.expect(401)
			.end(function(perguntaDeleteErr, perguntaDeleteRes) {
				// Set message assertion
				(perguntaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pergunta error error
				done(perguntaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Pergunta.remove().exec();
		done();
	});
});