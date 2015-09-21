'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var tarefas=require('../../app/controllers/tarefas.server.controller');

	//Every request without a parameter
	app.route('/tarefas')
		.get(tarefas.list)
		.post(tarefas.create);

		/**
		*every request with a tarefaId parameter
		*/ 
	app.route('/tarefas/:tarefaId')
		.get(tarefas.read)
		.put(tarefas.update)
		.delete(tarefas.delete);

		/*
		* Finish by binding the tarefa middleware
		*ainda nao entendi
		*/
	//app.param('tarefaId', tarefas.tarefaByID);
};