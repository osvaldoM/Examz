'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	exame = mongoose.model('exame'),
	Resolucao = mongoose.model('Resolucao');

/**
 * Globals
 */
var user, resolucao;

/**
 * Unit tests
 */
describe('Resolucao Model Unit Tests:', function() {
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
			resolucao = new Resolucao({
				pontos: 'Resolucao pontos',
				tempo: 'Resolucao tempo',
                 certas: 'Resolucao certas',
                 erradas: ' Resolucao erradas',
                 resolvidas: 'Resolucao resolvidas',
                 nResolvidas: 'Resolucao resolvidas',
                 exame: exame,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return resolucao.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			resolucao.name = '';

			return resolucao.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Resolucao.remove().exec();
		User.remove().exec();

		done();
	});
});