'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PerguntaResolvida = mongoose.model('PerguntaResolvida'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, perguntaResolvida;

/**
 * Pergunta resolvida routes tests
 */
describe('Pergunta resolvida CRUD tests', function() {
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

		// Save a user to the test db and create new Pergunta resolvida
		user.save(function() {
			perguntaResolvida = {
				estado: 'Pergunta resolvida Name'
			};

			done();
		});
	});

	it('should be able to save Pergunta resolvida instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pergunta resolvida
				agent.post('/pergunta-resolvidas')
					.send(perguntaResolvida)
					.expect(200)
					.end(function(perguntaResolvidaSaveErr, perguntaResolvidaSaveRes) {
						// Handle Pergunta resolvida save error
						if (perguntaResolvidaSaveErr) done(perguntaResolvidaSaveErr);

						// Get a list of Pergunta resolvidas
						agent.get('/pergunta-resolvidas')
							.end(function(perguntaResolvidasGetErr, perguntaResolvidasGetRes) {
								// Handle Pergunta resolvida save error
								if (perguntaResolvidasGetErr) done(perguntaResolvidasGetErr);

								// Get Pergunta resolvidas list
								var perguntaResolvidas = perguntaResolvidasGetRes.body;

								// Set assertions
								(perguntaResolvidas[0].user._id).should.equal(userId);
								(perguntaResolvidas[0].name).should.match('Pergunta resolvida Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pergunta resolvida instance if not logged in', function(done) {
		agent.post('/pergunta-resolvidas')
			.send(perguntaResolvida)
			.expect(401)
			.end(function(perguntaResolvidaSaveErr, perguntaResolvidaSaveRes) {
				// Call the assertion callback
				done(perguntaResolvidaSaveErr);
			});
	});

	it('should not be able to save Pergunta resolvida instance if no name is provided', function(done) {
		// Invalidate name field
		perguntaResolvida.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pergunta resolvida
				agent.post('/pergunta-resolvidas')
					.send(perguntaResolvida)
					.expect(400)
					.end(function(perguntaResolvidaSaveErr, perguntaResolvidaSaveRes) {
						// Set message assertion
						(perguntaResolvidaSaveRes.body.message).should.match('Please fill Pergunta resolvida name');
						
						// Handle Pergunta resolvida save error
						done(perguntaResolvidaSaveErr);
					});
			});
	});

	it('should be able to update Pergunta resolvida instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pergunta resolvida
				agent.post('/pergunta-resolvidas')
					.send(perguntaResolvida)
					.expect(200)
					.end(function(perguntaResolvidaSaveErr, perguntaResolvidaSaveRes) {
						// Handle Pergunta resolvida save error
						if (perguntaResolvidaSaveErr) done(perguntaResolvidaSaveErr);

						// Update Pergunta resolvida name
						perguntaResolvida.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pergunta resolvida
						agent.put('/pergunta-resolvidas/' + perguntaResolvidaSaveRes.body._id)
							.send(perguntaResolvida)
							.expect(200)
							.end(function(perguntaResolvidaUpdateErr, perguntaResolvidaUpdateRes) {
								// Handle Pergunta resolvida update error
								if (perguntaResolvidaUpdateErr) done(perguntaResolvidaUpdateErr);

								// Set assertions
								(perguntaResolvidaUpdateRes.body._id).should.equal(perguntaResolvidaSaveRes.body._id);
								(perguntaResolvidaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pergunta resolvidas if not signed in', function(done) {
		// Create new Pergunta resolvida model instance
		var perguntaResolvidaObj = new PerguntaResolvida(perguntaResolvida);

		// Save the Pergunta resolvida
		perguntaResolvidaObj.save(function() {
			// Request Pergunta resolvidas
			request(app).get('/pergunta-resolvidas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pergunta resolvida if not signed in', function(done) {
		// Create new Pergunta resolvida model instance
		var perguntaResolvidaObj = new PerguntaResolvida(perguntaResolvida);

		// Save the Pergunta resolvida
		perguntaResolvidaObj.save(function() {
			request(app).get('/pergunta-resolvidas/' + perguntaResolvidaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', perguntaResolvida.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pergunta resolvida instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pergunta resolvida
				agent.post('/pergunta-resolvidas')
					.send(perguntaResolvida)
					.expect(200)
					.end(function(perguntaResolvidaSaveErr, perguntaResolvidaSaveRes) {
						// Handle Pergunta resolvida save error
						if (perguntaResolvidaSaveErr) done(perguntaResolvidaSaveErr);

						// Delete existing Pergunta resolvida
						agent.delete('/pergunta-resolvidas/' + perguntaResolvidaSaveRes.body._id)
							.send(perguntaResolvida)
							.expect(200)
							.end(function(perguntaResolvidaDeleteErr, perguntaResolvidaDeleteRes) {
								// Handle Pergunta resolvida error error
								if (perguntaResolvidaDeleteErr) done(perguntaResolvidaDeleteErr);

								// Set assertions
								(perguntaResolvidaDeleteRes.body._id).should.equal(perguntaResolvidaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pergunta resolvida instance if not signed in', function(done) {
		// Set Pergunta resolvida user 
		perguntaResolvida.user = user;

		// Create new Pergunta resolvida model instance
		var perguntaResolvidaObj = new PerguntaResolvida(perguntaResolvida);

		// Save the Pergunta resolvida
		perguntaResolvidaObj.save(function() {
			// Try deleting Pergunta resolvida
			request(app).delete('/pergunta-resolvidas/' + perguntaResolvidaObj._id)
			.expect(401)
			.end(function(perguntaResolvidaDeleteErr, perguntaResolvidaDeleteRes) {
				// Set message assertion
				(perguntaResolvidaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pergunta resolvida error error
				done(perguntaResolvidaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PerguntaResolvida.remove().exec();
		done();
	});
});