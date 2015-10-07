'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ajuda = mongoose.model('Ajuda'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, ajuda;

/**
 * Ajuda routes tests
 */
describe('Ajuda CRUD tests', function() {
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

		// Save a user to the test db and create new Ajuda
		user.save(function() {
			ajuda = {
				name: 'Ajuda Name'
			};

			done();
		});
	});

	it('should be able to save Ajuda instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ajuda
				agent.post('/ajudas')
					.send(ajuda)
					.expect(200)
					.end(function(ajudaSaveErr, ajudaSaveRes) {
						// Handle Ajuda save error
						if (ajudaSaveErr) done(ajudaSaveErr);

						// Get a list of Ajudas
						agent.get('/ajudas')
							.end(function(ajudasGetErr, ajudasGetRes) {
								// Handle Ajuda save error
								if (ajudasGetErr) done(ajudasGetErr);

								// Get Ajudas list
								var ajudas = ajudasGetRes.body;

								// Set assertions
								(ajudas[0].user._id).should.equal(userId);
								(ajudas[0].name).should.match('Ajuda Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Ajuda instance if not logged in', function(done) {
		agent.post('/ajudas')
			.send(ajuda)
			.expect(401)
			.end(function(ajudaSaveErr, ajudaSaveRes) {
				// Call the assertion callback
				done(ajudaSaveErr);
			});
	});

	it('should not be able to save Ajuda instance if no name is provided', function(done) {
		// Invalidate name field
		ajuda.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ajuda
				agent.post('/ajudas')
					.send(ajuda)
					.expect(400)
					.end(function(ajudaSaveErr, ajudaSaveRes) {
						// Set message assertion
						(ajudaSaveRes.body.message).should.match('Please fill Ajuda name');
						
						// Handle Ajuda save error
						done(ajudaSaveErr);
					});
			});
	});

	it('should be able to update Ajuda instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ajuda
				agent.post('/ajudas')
					.send(ajuda)
					.expect(200)
					.end(function(ajudaSaveErr, ajudaSaveRes) {
						// Handle Ajuda save error
						if (ajudaSaveErr) done(ajudaSaveErr);

						// Update Ajuda name
						ajuda.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Ajuda
						agent.put('/ajudas/' + ajudaSaveRes.body._id)
							.send(ajuda)
							.expect(200)
							.end(function(ajudaUpdateErr, ajudaUpdateRes) {
								// Handle Ajuda update error
								if (ajudaUpdateErr) done(ajudaUpdateErr);

								// Set assertions
								(ajudaUpdateRes.body._id).should.equal(ajudaSaveRes.body._id);
								(ajudaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Ajudas if not signed in', function(done) {
		// Create new Ajuda model instance
		var ajudaObj = new Ajuda(ajuda);

		// Save the Ajuda
		ajudaObj.save(function() {
			// Request Ajudas
			request(app).get('/ajudas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Ajuda if not signed in', function(done) {
		// Create new Ajuda model instance
		var ajudaObj = new Ajuda(ajuda);

		// Save the Ajuda
		ajudaObj.save(function() {
			request(app).get('/ajudas/' + ajudaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', ajuda.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Ajuda instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ajuda
				agent.post('/ajudas')
					.send(ajuda)
					.expect(200)
					.end(function(ajudaSaveErr, ajudaSaveRes) {
						// Handle Ajuda save error
						if (ajudaSaveErr) done(ajudaSaveErr);

						// Delete existing Ajuda
						agent.delete('/ajudas/' + ajudaSaveRes.body._id)
							.send(ajuda)
							.expect(200)
							.end(function(ajudaDeleteErr, ajudaDeleteRes) {
								// Handle Ajuda error error
								if (ajudaDeleteErr) done(ajudaDeleteErr);

								// Set assertions
								(ajudaDeleteRes.body._id).should.equal(ajudaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Ajuda instance if not signed in', function(done) {
		// Set Ajuda user 
		ajuda.user = user;

		// Create new Ajuda model instance
		var ajudaObj = new Ajuda(ajuda);

		// Save the Ajuda
		ajudaObj.save(function() {
			// Try deleting Ajuda
			request(app).delete('/ajudas/' + ajudaObj._id)
			.expect(401)
			.end(function(ajudaDeleteErr, ajudaDeleteRes) {
				// Set message assertion
				(ajudaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Ajuda error error
				done(ajudaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Ajuda.remove().exec();
		done();
	});
});