'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Alternativa = mongoose.model('Alternativa'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, alternativa;

/**
 * Alternativa routes tests
 */
describe('Alternativa CRUD tests', function() {
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

		// Save a user to the test db and create new Alternativa
		user.save(function() {
			alternativa = {
				name: 'Alternativa Name'
			};

			done();
		});
	});

	it('should be able to save Alternativa instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Alternativa
				agent.post('/alternativas')
					.send(alternativa)
					.expect(200)
					.end(function(alternativaSaveErr, alternativaSaveRes) {
						// Handle Alternativa save error
						if (alternativaSaveErr) done(alternativaSaveErr);

						// Get a list of Alternativas
						agent.get('/alternativas')
							.end(function(alternativasGetErr, alternativasGetRes) {
								// Handle Alternativa save error
								if (alternativasGetErr) done(alternativasGetErr);

								// Get Alternativas list
								var alternativas = alternativasGetRes.body;

								// Set assertions
								(alternativas[0].user._id).should.equal(userId);
								(alternativas[0].name).should.match('Alternativa Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Alternativa instance if not logged in', function(done) {
		agent.post('/alternativas')
			.send(alternativa)
			.expect(401)
			.end(function(alternativaSaveErr, alternativaSaveRes) {
				// Call the assertion callback
				done(alternativaSaveErr);
			});
	});

	it('should not be able to save Alternativa instance if no name is provided', function(done) {
		// Invalidate name field
		alternativa.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Alternativa
				agent.post('/alternativas')
					.send(alternativa)
					.expect(400)
					.end(function(alternativaSaveErr, alternativaSaveRes) {
						// Set message assertion
						(alternativaSaveRes.body.message).should.match('Please fill Alternativa name');
						
						// Handle Alternativa save error
						done(alternativaSaveErr);
					});
			});
	});

	it('should be able to update Alternativa instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Alternativa
				agent.post('/alternativas')
					.send(alternativa)
					.expect(200)
					.end(function(alternativaSaveErr, alternativaSaveRes) {
						// Handle Alternativa save error
						if (alternativaSaveErr) done(alternativaSaveErr);

						// Update Alternativa name
						alternativa.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Alternativa
						agent.put('/alternativas/' + alternativaSaveRes.body._id)
							.send(alternativa)
							.expect(200)
							.end(function(alternativaUpdateErr, alternativaUpdateRes) {
								// Handle Alternativa update error
								if (alternativaUpdateErr) done(alternativaUpdateErr);

								// Set assertions
								(alternativaUpdateRes.body._id).should.equal(alternativaSaveRes.body._id);
								(alternativaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Alternativas if not signed in', function(done) {
		// Create new Alternativa model instance
		var alternativaObj = new Alternativa(alternativa);

		// Save the Alternativa
		alternativaObj.save(function() {
			// Request Alternativas
			request(app).get('/alternativas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Alternativa if not signed in', function(done) {
		// Create new Alternativa model instance
		var alternativaObj = new Alternativa(alternativa);

		// Save the Alternativa
		alternativaObj.save(function() {
			request(app).get('/alternativas/' + alternativaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', alternativa.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Alternativa instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Alternativa
				agent.post('/alternativas')
					.send(alternativa)
					.expect(200)
					.end(function(alternativaSaveErr, alternativaSaveRes) {
						// Handle Alternativa save error
						if (alternativaSaveErr) done(alternativaSaveErr);

						// Delete existing Alternativa
						agent.delete('/alternativas/' + alternativaSaveRes.body._id)
							.send(alternativa)
							.expect(200)
							.end(function(alternativaDeleteErr, alternativaDeleteRes) {
								// Handle Alternativa error error
								if (alternativaDeleteErr) done(alternativaDeleteErr);

								// Set assertions
								(alternativaDeleteRes.body._id).should.equal(alternativaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Alternativa instance if not signed in', function(done) {
		// Set Alternativa user 
		alternativa.user = user;

		// Create new Alternativa model instance
		var alternativaObj = new Alternativa(alternativa);

		// Save the Alternativa
		alternativaObj.save(function() {
			// Try deleting Alternativa
			request(app).delete('/alternativas/' + alternativaObj._id)
			.expect(401)
			.end(function(alternativaDeleteErr, alternativaDeleteRes) {
				// Set message assertion
				(alternativaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Alternativa error error
				done(alternativaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Alternativa.remove().exec();
		done();
	});
});