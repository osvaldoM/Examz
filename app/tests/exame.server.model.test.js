'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Exame = mongoose.model('Exame');

/**
 * Globals
 */
var user, exame;

/**
 * Unit tests
 */
describe('Exame Model Unit Tests:', function() {
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
			exame = new Exame({
				name: 'Exame Name',
				instrucoes: 'Exame instrucoes',
				tempo: 'Exame tempo',
				ano: 'Exame ano',
				nrPerguntas: 'Exame nrPerguntas',

				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return exame.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			exame.name = '';

			return exame.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Exame.remove().exec();
		User.remove().exec();

		done();
	});
});