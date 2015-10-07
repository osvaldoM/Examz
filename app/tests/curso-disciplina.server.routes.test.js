'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CursoDisciplina = mongoose.model('CursoDisciplina'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, cursoDisciplina;

/**
 * Curso disciplina routes tests
 */
describe('Curso disciplina CRUD tests', function() {
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

		// Save a user to the test db and create new Curso disciplina
		user.save(function() {
			cursoDisciplina = {
				name: 'Curso disciplina Name'
			};

			done();
		});
	});

	it('should be able to save Curso disciplina instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Curso disciplina
				agent.post('/curso-disciplinas')
					.send(cursoDisciplina)
					.expect(200)
					.end(function(cursoDisciplinaSaveErr, cursoDisciplinaSaveRes) {
						// Handle Curso disciplina save error
						if (cursoDisciplinaSaveErr) done(cursoDisciplinaSaveErr);

						// Get a list of Curso disciplinas
						agent.get('/curso-disciplinas')
							.end(function(cursoDisciplinasGetErr, cursoDisciplinasGetRes) {
								// Handle Curso disciplina save error
								if (cursoDisciplinasGetErr) done(cursoDisciplinasGetErr);

								// Get Curso disciplinas list
								var cursoDisciplinas = cursoDisciplinasGetRes.body;

								// Set assertions
								(cursoDisciplinas[0].user._id).should.equal(userId);
								(cursoDisciplinas[0].name).should.match('Curso disciplina Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Curso disciplina instance if not logged in', function(done) {
		agent.post('/curso-disciplinas')
			.send(cursoDisciplina)
			.expect(401)
			.end(function(cursoDisciplinaSaveErr, cursoDisciplinaSaveRes) {
				// Call the assertion callback
				done(cursoDisciplinaSaveErr);
			});
	});

	it('should not be able to save Curso disciplina instance if no name is provided', function(done) {
		// Invalidate name field
		cursoDisciplina.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Curso disciplina
				agent.post('/curso-disciplinas')
					.send(cursoDisciplina)
					.expect(400)
					.end(function(cursoDisciplinaSaveErr, cursoDisciplinaSaveRes) {
						// Set message assertion
						(cursoDisciplinaSaveRes.body.message).should.match('Please fill Curso disciplina name');
						
						// Handle Curso disciplina save error
						done(cursoDisciplinaSaveErr);
					});
			});
	});

	it('should be able to update Curso disciplina instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Curso disciplina
				agent.post('/curso-disciplinas')
					.send(cursoDisciplina)
					.expect(200)
					.end(function(cursoDisciplinaSaveErr, cursoDisciplinaSaveRes) {
						// Handle Curso disciplina save error
						if (cursoDisciplinaSaveErr) done(cursoDisciplinaSaveErr);

						// Update Curso disciplina name
						cursoDisciplina.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Curso disciplina
						agent.put('/curso-disciplinas/' + cursoDisciplinaSaveRes.body._id)
							.send(cursoDisciplina)
							.expect(200)
							.end(function(cursoDisciplinaUpdateErr, cursoDisciplinaUpdateRes) {
								// Handle Curso disciplina update error
								if (cursoDisciplinaUpdateErr) done(cursoDisciplinaUpdateErr);

								// Set assertions
								(cursoDisciplinaUpdateRes.body._id).should.equal(cursoDisciplinaSaveRes.body._id);
								(cursoDisciplinaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Curso disciplinas if not signed in', function(done) {
		// Create new Curso disciplina model instance
		var cursoDisciplinaObj = new CursoDisciplina(cursoDisciplina);

		// Save the Curso disciplina
		cursoDisciplinaObj.save(function() {
			// Request Curso disciplinas
			request(app).get('/curso-disciplinas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Curso disciplina if not signed in', function(done) {
		// Create new Curso disciplina model instance
		var cursoDisciplinaObj = new CursoDisciplina(cursoDisciplina);

		// Save the Curso disciplina
		cursoDisciplinaObj.save(function() {
			request(app).get('/curso-disciplinas/' + cursoDisciplinaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', cursoDisciplina.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Curso disciplina instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Curso disciplina
				agent.post('/curso-disciplinas')
					.send(cursoDisciplina)
					.expect(200)
					.end(function(cursoDisciplinaSaveErr, cursoDisciplinaSaveRes) {
						// Handle Curso disciplina save error
						if (cursoDisciplinaSaveErr) done(cursoDisciplinaSaveErr);

						// Delete existing Curso disciplina
						agent.delete('/curso-disciplinas/' + cursoDisciplinaSaveRes.body._id)
							.send(cursoDisciplina)
							.expect(200)
							.end(function(cursoDisciplinaDeleteErr, cursoDisciplinaDeleteRes) {
								// Handle Curso disciplina error error
								if (cursoDisciplinaDeleteErr) done(cursoDisciplinaDeleteErr);

								// Set assertions
								(cursoDisciplinaDeleteRes.body._id).should.equal(cursoDisciplinaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Curso disciplina instance if not signed in', function(done) {
		// Set Curso disciplina user 
		cursoDisciplina.user = user;

		// Create new Curso disciplina model instance
		var cursoDisciplinaObj = new CursoDisciplina(cursoDisciplina);

		// Save the Curso disciplina
		cursoDisciplinaObj.save(function() {
			// Try deleting Curso disciplina
			request(app).delete('/curso-disciplinas/' + cursoDisciplinaObj._id)
			.expect(401)
			.end(function(cursoDisciplinaDeleteErr, cursoDisciplinaDeleteRes) {
				// Set message assertion
				(cursoDisciplinaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Curso disciplina error error
				done(cursoDisciplinaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		CursoDisciplina.remove().exec();
		done();
	});
});