'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var disciplinas = require('../../app/controllers/disciplinas.server.controller');

	// Disciplinas Routes
	app.route('/disciplinas')
		.get(disciplinas.list)
		.post(users.requiresLogin, disciplinas.create);

	app.route('/disciplinas/:disciplinaId')
		.get(disciplinas.read)
		.put(users.requiresLogin, disciplinas.hasAuthorization, disciplinas.update)
		.delete(users.requiresLogin, disciplinas.hasAuthorization, disciplinas.delete);

	// Finish by binding the Disciplina middleware
	app.param('disciplinaId', disciplinas.disciplinaByID);
};
