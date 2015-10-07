'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Tarefa = mongoose.model('Tarefa'),
	Membro=mongoose.model('Membro');

/**
 * Globals
 */
var user, tarefa;

/**
 * Unit tests
 */
describe('Tarefa Model Unit Tests:', function() {
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

		 var	mem= new Membro({
		 	nome:'membTeste',
		 	cargo:'chefe',
		 	username:'ujdsfdh',
		 	password:'fhddhfhdf'
		 });
		 	mem.save(function(){
		 	tarefa = new Tarefa({
				// Add model fields
				titulo:'TituloTeste',
				descriccao:'descTeste',
				membro:mem
			});

			done();	
		 	});
			
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return tarefa.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Tarefa.remove().exec();
		User.remove().exec();

		done();
	});
});