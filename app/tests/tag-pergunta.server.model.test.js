'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	tag = mongoose.model('tag'),
	pergunta = mongoose.model('pergunta'),
	TagPergunta = mongoose.model('TagPergunta');

/**
 * Globals
 */
var user, tagPergunta;

/**
 * Unit tests
 */
describe('Tag pergunta Model Unit Tests:', function() {
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
			tagPergunta = new TagPergunta({
				name: 'Tag pergunta Name',
				tag: tag,
				pergunta: pergunta,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return tagPergunta.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			tagPergunta.name = '';

			return tagPergunta.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		TagPergunta.remove().exec();
		User.remove().exec();

		done();
	});
});