'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Membro = mongoose.model('Membro');

/**
 * Globals
 */
var user, membro;

/**
 * Unit tests
 */
describe('Membro Model Unit Tests:', function() {
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
			membro = new Membro({
				// Add model fields
				// ...
				nome:'osvaldo',
				cargo:'Leader',
				username:'osvaldoM',
				password:'senha',
				tarefa:[{titulo:'test task'},{titulo:'tset 2'}]

			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return membro.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Membro.remove().exec();
		User.remove().exec();

		done();
	});
});