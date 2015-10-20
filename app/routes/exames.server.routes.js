'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var exames = require('../../app/controllers/exames.server.controller');

	// Exames Routes
	app.route('/exames')
		.get(exames.list)
		.post(users.requiresLogin, exames.create);

	app.route('/exames/listar')
		.get(exames.listar);

	app.route('/exames/:exameId')
		.get(exames.read)
		.put(users.requiresLogin, exames.hasAuthorization, exames.update)
		.delete(users.requiresLogin, exames.hasAuthorization, exames.delete);

	// Finish by binding the Exame middleware
	app.param('exameId', exames.exameByID);
};
