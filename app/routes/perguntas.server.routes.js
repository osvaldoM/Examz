'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var perguntas = require('../../app/controllers/perguntas.server.controller');

	// Perguntas Routes
	app.route('/perguntas')
		.get(perguntas.list)
		.post(users.requiresLogin, perguntas.create);

	app.route('/perguntas/listar')
		.get(perguntas.listar);

		

	app.route('/perguntas/:perguntaId')
		.get(perguntas.read) 
		.put( perguntas.update)
		.delete(users.requiresLogin, perguntas.hasAuthorization, perguntas.delete);


	app.route('/perguntasOrigi/:pergunta')
		.get(perguntas.readOrigi);	

		
	// Finish by binding the Pergunta middleware
	app.param('perguntaId', perguntas.perguntaByID);
};
