'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TagPergunta = mongoose.model('TagPergunta'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, tagPergunta;

/**
 * Tag pergunta routes tests
 */
describe('Tag pergunta CRUD tests', function() {
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

		// Save a user to the test db and create new Tag pergunta
		user.save(function() {
			tagPergunta = {
				name: 'Tag pergunta Name'
			};

			done();
		});
	});

	it('should be able to save Tag pergunta instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tag pergunta
				agent.post('/tag-perguntas')
					.send(tagPergunta)
					.expect(200)
					.end(function(tagPerguntaSaveErr, tagPerguntaSaveRes) {
						// Handle Tag pergunta save error
						if (tagPerguntaSaveErr) done(tagPerguntaSaveErr);

						// Get a list of Tag perguntas
						agent.get('/tag-perguntas')
							.end(function(tagPerguntasGetErr, tagPerguntasGetRes) {
								// Handle Tag pergunta save error
								if (tagPerguntasGetErr) done(tagPerguntasGetErr);

								// Get Tag perguntas list
								var tagPerguntas = tagPerguntasGetRes.body;

								// Set assertions
								(tagPerguntas[0].user._id).should.equal(userId);
								(tagPerguntas[0].name).should.match('Tag pergunta Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Tag pergunta instance if not logged in', function(done) {
		agent.post('/tag-perguntas')
			.send(tagPergunta)
			.expect(401)
			.end(function(tagPerguntaSaveErr, tagPerguntaSaveRes) {
				// Call the assertion callback
				done(tagPerguntaSaveErr);
			});
	});

	it('should not be able to save Tag pergunta instance if no name is provided', function(done) {
		// Invalidate name field
		tagPergunta.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tag pergunta
				agent.post('/tag-perguntas')
					.send(tagPergunta)
					.expect(400)
					.end(function(tagPerguntaSaveErr, tagPerguntaSaveRes) {
						// Set message assertion
						(tagPerguntaSaveRes.body.message).should.match('Please fill Tag pergunta name');
						
						// Handle Tag pergunta save error
						done(tagPerguntaSaveErr);
					});
			});
	});

	it('should be able to update Tag pergunta instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tag pergunta
				agent.post('/tag-perguntas')
					.send(tagPergunta)
					.expect(200)
					.end(function(tagPerguntaSaveErr, tagPerguntaSaveRes) {
						// Handle Tag pergunta save error
						if (tagPerguntaSaveErr) done(tagPerguntaSaveErr);

						// Update Tag pergunta name
						tagPergunta.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Tag pergunta
						agent.put('/tag-perguntas/' + tagPerguntaSaveRes.body._id)
							.send(tagPergunta)
							.expect(200)
							.end(function(tagPerguntaUpdateErr, tagPerguntaUpdateRes) {
								// Handle Tag pergunta update error
								if (tagPerguntaUpdateErr) done(tagPerguntaUpdateErr);

								// Set assertions
								(tagPerguntaUpdateRes.body._id).should.equal(tagPerguntaSaveRes.body._id);
								(tagPerguntaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Tag perguntas if not signed in', function(done) {
		// Create new Tag pergunta model instance
		var tagPerguntaObj = new TagPergunta(tagPergunta);

		// Save the Tag pergunta
		tagPerguntaObj.save(function() {
			// Request Tag perguntas
			request(app).get('/tag-perguntas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Tag pergunta if not signed in', function(done) {
		// Create new Tag pergunta model instance
		var tagPerguntaObj = new TagPergunta(tagPergunta);

		// Save the Tag pergunta
		tagPerguntaObj.save(function() {
			request(app).get('/tag-perguntas/' + tagPerguntaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', tagPergunta.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Tag pergunta instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tag pergunta
				agent.post('/tag-perguntas')
					.send(tagPergunta)
					.expect(200)
					.end(function(tagPerguntaSaveErr, tagPerguntaSaveRes) {
						// Handle Tag pergunta save error
						if (tagPerguntaSaveErr) done(tagPerguntaSaveErr);

						// Delete existing Tag pergunta
						agent.delete('/tag-perguntas/' + tagPerguntaSaveRes.body._id)
							.send(tagPergunta)
							.expect(200)
							.end(function(tagPerguntaDeleteErr, tagPerguntaDeleteRes) {
								// Handle Tag pergunta error error
								if (tagPerguntaDeleteErr) done(tagPerguntaDeleteErr);

								// Set assertions
								(tagPerguntaDeleteRes.body._id).should.equal(tagPerguntaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Tag pergunta instance if not signed in', function(done) {
		// Set Tag pergunta user 
		tagPergunta.user = user;

		// Create new Tag pergunta model instance
		var tagPerguntaObj = new TagPergunta(tagPergunta);

		// Save the Tag pergunta
		tagPerguntaObj.save(function() {
			// Try deleting Tag pergunta
			request(app).delete('/tag-perguntas/' + tagPerguntaObj._id)
			.expect(401)
			.end(function(tagPerguntaDeleteErr, tagPerguntaDeleteRes) {
				// Set message assertion
				(tagPerguntaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Tag pergunta error error
				done(tagPerguntaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		TagPergunta.remove().exec();
		done();
	});
});