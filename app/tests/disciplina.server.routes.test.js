'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Disciplina = mongoose.model('Disciplina'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, disciplina;

/**
 * Disciplina routes tests
 */
describe('Disciplina CRUD tests', function() {
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

		// Save a user to the test db and create new Disciplina
		user.save(function() {
			disciplina = {
				name: 'Disciplina Name'
			};

			done();
		});
	});

	it('should be able to save Disciplina instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Disciplina
				agent.post('/disciplinas')
					.send(disciplina)
					.expect(200)
					.end(function(disciplinaSaveErr, disciplinaSaveRes) {
						// Handle Disciplina save error
						if (disciplinaSaveErr) done(disciplinaSaveErr);

						// Get a list of Disciplinas
						agent.get('/disciplinas')
							.end(function(disciplinasGetErr, disciplinasGetRes) {
								// Handle Disciplina save error
								if (disciplinasGetErr) done(disciplinasGetErr);

								// Get Disciplinas list
								var disciplinas = disciplinasGetRes.body;

								// Set assertions
								(disciplinas[0].user._id).should.equal(userId);
								(disciplinas[0].name).should.match('Disciplina Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Disciplina instance if not logged in', function(done) {
		agent.post('/disciplinas')
			.send(disciplina)
			.expect(401)
			.end(function(disciplinaSaveErr, disciplinaSaveRes) {
				// Call the assertion callback
				done(disciplinaSaveErr);
			});
	});

	it('should not be able to save Disciplina instance if no name is provided', function(done) {
		// Invalidate name field
		disciplina.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Disciplina
				agent.post('/disciplinas')
					.send(disciplina)
					.expect(400)
					.end(function(disciplinaSaveErr, disciplinaSaveRes) {
						// Set message assertion
						(disciplinaSaveRes.body.message).should.match('Please fill Disciplina name');
						
						// Handle Disciplina save error
						done(disciplinaSaveErr);
					});
			});
	});

	it('should be able to update Disciplina instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Disciplina
				agent.post('/disciplinas')
					.send(disciplina)
					.expect(200)
					.end(function(disciplinaSaveErr, disciplinaSaveRes) {
						// Handle Disciplina save error
						if (disciplinaSaveErr) done(disciplinaSaveErr);

						// Update Disciplina name
						disciplina.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Disciplina
						agent.put('/disciplinas/' + disciplinaSaveRes.body._id)
							.send(disciplina)
							.expect(200)
							.end(function(disciplinaUpdateErr, disciplinaUpdateRes) {
								// Handle Disciplina update error
								if (disciplinaUpdateErr) done(disciplinaUpdateErr);

								// Set assertions
								(disciplinaUpdateRes.body._id).should.equal(disciplinaSaveRes.body._id);
								(disciplinaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Disciplinas if not signed in', function(done) {
		// Create new Disciplina model instance
		var disciplinaObj = new Disciplina(disciplina);

		// Save the Disciplina
		disciplinaObj.save(function() {
			// Request Disciplinas
			request(app).get('/disciplinas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Disciplina if not signed in', function(done) {
		// Create new Disciplina model instance
		var disciplinaObj = new Disciplina(disciplina);

		// Save the Disciplina
		disciplinaObj.save(function() {
			request(app).get('/disciplinas/' + disciplinaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', disciplina.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Disciplina instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Disciplina
				agent.post('/disciplinas')
					.send(disciplina)
					.expect(200)
					.end(function(disciplinaSaveErr, disciplinaSaveRes) {
						// Handle Disciplina save error
						if (disciplinaSaveErr) done(disciplinaSaveErr);

						// Delete existing Disciplina
						agent.delete('/disciplinas/' + disciplinaSaveRes.body._id)
							.send(disciplina)
							.expect(200)
							.end(function(disciplinaDeleteErr, disciplinaDeleteRes) {
								// Handle Disciplina error error
								if (disciplinaDeleteErr) done(disciplinaDeleteErr);

								// Set assertions
								(disciplinaDeleteRes.body._id).should.equal(disciplinaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Disciplina instance if not signed in', function(done) {
		// Set Disciplina user 
		disciplina.user = user;

		// Create new Disciplina model instance
		var disciplinaObj = new Disciplina(disciplina);

		// Save the Disciplina
		disciplinaObj.save(function() {
			// Try deleting Disciplina
			request(app).delete('/disciplinas/' + disciplinaObj._id)
			.expect(401)
			.end(function(disciplinaDeleteErr, disciplinaDeleteRes) {
				// Set message assertion
				(disciplinaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Disciplina error error
				done(disciplinaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Disciplina.remove().exec();
		done();
	});
});