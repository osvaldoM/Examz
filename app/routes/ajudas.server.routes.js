'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var ajudas = require('../../app/controllers/ajudas.server.controller');

	// Ajudas Routes
	app.route('/ajudas')
		.get(ajudas.list)
		.post(users.requiresLogin, ajudas.create);

	app.route('/ajudas/:ajudaId')
		.get(ajudas.read)
		.put(users.requiresLogin, ajudas.hasAuthorization, ajudas.update)
		.delete(users.requiresLogin, ajudas.hasAuthorization, ajudas.delete);

	// Finish by binding the Ajuda middleware
	app.param('ajudaId', ajudas.ajudaByID);
};
