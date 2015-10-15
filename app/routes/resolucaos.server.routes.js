'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var resolucaos = require('../../app/controllers/resolucaos.server.controller');

	// Resolucaos Routes
	app.route('/resolucaos')
		.get(resolucaos.list)
		.post(users.requiresLogin, resolucaos.create);

		app.route('/resolucaos/listar')
		.get(resolucaos.listar);

	app.route('/resolucaos/:resolucaoId')
		.get(resolucaos.read)
		.put(users.requiresLogin, resolucaos.hasAuthorization, resolucaos.update)
		.delete(users.requiresLogin, resolucaos.hasAuthorization, resolucaos.delete);

	// Finish by binding the Resolucao middleware
	app.param('resolucaoId', resolucaos.resolucaoByID);
};
