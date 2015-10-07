'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var alternativas = require('../../app/controllers/alternativas.server.controller');

	// Alternativas Routes
	app.route('/alternativas')
		.get(alternativas.list)
		.post(users.requiresLogin, alternativas.create);

	app.route('/alternativas/:alternativaId')
		.get(alternativas.read)
		.put(users.requiresLogin, alternativas.hasAuthorization, alternativas.update)
		.delete(users.requiresLogin, alternativas.hasAuthorization, alternativas.delete);

	// Finish by binding the Alternativa middleware
	app.param('alternativaId', alternativas.alternativaByID);
};
