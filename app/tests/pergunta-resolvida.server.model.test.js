'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	resolucao = mongoose.model('resolucao'),
	User = mongoose.model('User'),
	PerguntaResolvida = mongoose.model('PerguntaResolvida');

/**
 * Globals
 */
var user, perguntaResolvida;

/**
 * Unit tests
 */
describe('Pergunta resolvida Model Unit Tests:', function() {
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
			perguntaResolvida = new PerguntaResolvida({
				estado: 'Pergunta resolvida estado',
				resolucao: resolucao,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return perguntaResolvida.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			perguntaResolvida.name = '';

			return perguntaResolvida.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		PerguntaResolvida.remove().exec();
		User.remove().exec();

		done();
	});
});