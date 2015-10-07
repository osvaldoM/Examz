'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var perguntaResolvidas = require('../../app/controllers/pergunta-resolvidas.server.controller');

	// Pergunta resolvidas Routes
	app.route('/pergunta-resolvidas')
		.get(perguntaResolvidas.list)
		.post(users.requiresLogin, perguntaResolvidas.create);

	app.route('/pergunta-resolvidas/:perguntaResolvidaId')
		.get(perguntaResolvidas.read)
		.put(users.requiresLogin, perguntaResolvidas.hasAuthorization, perguntaResolvidas.update)
		.delete(users.requiresLogin, perguntaResolvidas.hasAuthorization, perguntaResolvidas.delete);

	// Finish by binding the Pergunta resolvida middleware
	app.param('perguntaResolvidaId', perguntaResolvidas.perguntaResolvidaByID);
};
