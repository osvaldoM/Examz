'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var perguntas = require('../../app/controllers/perguntas.server.controller');

	// Perguntas Routes
	app.route('/perguntas')
		.get(perguntas.list)
		.post(users.requiresLogin, perguntas.create);

		app.route('/perguntas/byExame/:id')
		.get(perguntas.listar);


	app.get('byExame',function(req,res,next){
	 		console.log('parametro eh :'+req.query.perguntaId);
	 		perguntas.byExame(req,res);
	 	});
		

	app.route('/perguntas/:perguntaId')
		.get(function(req,res,next){
			if(req.params.perguntaId==='byExame')
				perguntas.listar(req,res);
			else
			perguntas.read(req,res); 
		})
		.put(users.requiresLogin, perguntas.hasAuthorization, perguntas.update)
		.delete(users.requiresLogin, perguntas.hasAuthorization, perguntas.delete);




	// Finish by binding the Pergunta middleware
	//app.param('perguntaId', perguntas.perguntaByID);
};
