'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Resolucao = mongoose.model('Resolucao'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, resolucao;

/**
 * Resolucao routes tests
 */
describe('Resolucao CRUD tests', function() {
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

		// Save a user to the test db and create new Resolucao
		user.save(function() {
			resolucao = {
				name: 'Resolucao Name'
			};

			done();
		});
	});

	it('should be able to save Resolucao instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resolucao
				agent.post('/resolucaos')
					.send(resolucao)
					.expect(200)
					.end(function(resolucaoSaveErr, resolucaoSaveRes) {
						// Handle Resolucao save error
						if (resolucaoSaveErr) done(resolucaoSaveErr);

						// Get a list of Resolucaos
						agent.get('/resolucaos')
							.end(function(resolucaosGetErr, resolucaosGetRes) {
								// Handle Resolucao save error
								if (resolucaosGetErr) done(resolucaosGetErr);

								// Get Resolucaos list
								var resolucaos = resolucaosGetRes.body;

								// Set assertions
								(resolucaos[0].user._id).should.equal(userId);
								(resolucaos[0].name).should.match('Resolucao Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Resolucao instance if not logged in', function(done) {
		agent.post('/resolucaos')
			.send(resolucao)
			.expect(401)
			.end(function(resolucaoSaveErr, resolucaoSaveRes) {
				// Call the assertion callback
				done(resolucaoSaveErr);
			});
	});

	it('should not be able to save Resolucao instance if no name is provided', function(done) {
		// Invalidate name field
		resolucao.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resolucao
				agent.post('/resolucaos')
					.send(resolucao)
					.expect(400)
					.end(function(resolucaoSaveErr, resolucaoSaveRes) {
						// Set message assertion
						(resolucaoSaveRes.body.message).should.match('Please fill Resolucao name');
						
						// Handle Resolucao save error
						done(resolucaoSaveErr);
					});
			});
	});

	it('should be able to update Resolucao instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resolucao
				agent.post('/resolucaos')
					.send(resolucao)
					.expect(200)
					.end(function(resolucaoSaveErr, resolucaoSaveRes) {
						// Handle Resolucao save error
						if (resolucaoSaveErr) done(resolucaoSaveErr);

						// Update Resolucao name
						resolucao.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Resolucao
						agent.put('/resolucaos/' + resolucaoSaveRes.body._id)
							.send(resolucao)
							.expect(200)
							.end(function(resolucaoUpdateErr, resolucaoUpdateRes) {
								// Handle Resolucao update error
								if (resolucaoUpdateErr) done(resolucaoUpdateErr);

								// Set assertions
								(resolucaoUpdateRes.body._id).should.equal(resolucaoSaveRes.body._id);
								(resolucaoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Resolucaos if not signed in', function(done) {
		// Create new Resolucao model instance
		var resolucaoObj = new Resolucao(resolucao);

		// Save the Resolucao
		resolucaoObj.save(function() {
			// Request Resolucaos
			request(app).get('/resolucaos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Resolucao if not signed in', function(done) {
		// Create new Resolucao model instance
		var resolucaoObj = new Resolucao(resolucao);

		// Save the Resolucao
		resolucaoObj.save(function() {
			request(app).get('/resolucaos/' + resolucaoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', resolucao.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Resolucao instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resolucao
				agent.post('/resolucaos')
					.send(resolucao)
					.expect(200)
					.end(function(resolucaoSaveErr, resolucaoSaveRes) {
						// Handle Resolucao save error
						if (resolucaoSaveErr) done(resolucaoSaveErr);

						// Delete existing Resolucao
						agent.delete('/resolucaos/' + resolucaoSaveRes.body._id)
							.send(resolucao)
							.expect(200)
							.end(function(resolucaoDeleteErr, resolucaoDeleteRes) {
								// Handle Resolucao error error
								if (resolucaoDeleteErr) done(resolucaoDeleteErr);

								// Set assertions
								(resolucaoDeleteRes.body._id).should.equal(resolucaoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Resolucao instance if not signed in', function(done) {
		// Set Resolucao user 
		resolucao.user = user;

		// Create new Resolucao model instance
		var resolucaoObj = new Resolucao(resolucao);

		// Save the Resolucao
		resolucaoObj.save(function() {
			// Try deleting Resolucao
			request(app).delete('/resolucaos/' + resolucaoObj._id)
			.expect(401)
			.end(function(resolucaoDeleteErr, resolucaoDeleteRes) {
				// Set message assertion
				(resolucaoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Resolucao error error
				done(resolucaoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Resolucao.remove().exec();
		done();
	});
});