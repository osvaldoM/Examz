'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var cursoDisciplinas = require('../../app/controllers/curso-disciplinas.server.controller');

	// Curso disciplinas Routes
	app.route('/curso-disciplinas')
		.get(cursoDisciplinas.list)
		.post(users.requiresLogin, cursoDisciplinas.create);

	app.route('/curso-disciplinas/:cursoDisciplinaId')
		.get(cursoDisciplinas.read)
		.put(users.requiresLogin, cursoDisciplinas.hasAuthorization, cursoDisciplinas.update)
		.delete(users.requiresLogin, cursoDisciplinas.hasAuthorization, cursoDisciplinas.delete);

	// Finish by binding the Curso disciplina middleware
	app.param('cursoDisciplinaId', cursoDisciplinas.cursoDisciplinaByID);
};
