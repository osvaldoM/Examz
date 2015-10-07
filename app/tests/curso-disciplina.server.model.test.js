'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	curso= mongoose.model('curso'),
	disciplina= mongoose.model('disciplina'),
	CursoDisciplina = mongoose.model('CursoDisciplina');

/**
 * Globals
 */
var user, cursoDisciplina;

/**
 * Unit tests
 */
describe('Curso disciplina Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			cursoDisciplina = new CursoDisciplina({
				//name: 'Curso disciplina Name',
				user: user,
				disciplina: disciplina,
				curso: curso
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return cursoDisciplina.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			cursoDisciplina.name = '';

			return cursoDisciplina.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		CursoDisciplina.remove().exec();
		User.remove().exec();

		done();
	});
});