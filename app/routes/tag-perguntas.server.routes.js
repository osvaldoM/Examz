'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var tagPerguntas = require('../../app/controllers/tag-perguntas.server.controller');

	// Tag perguntas Routes
	app.route('/tag-perguntas')
		.get(tagPerguntas.list)
		.post(users.requiresLogin, tagPerguntas.create);

	app.route('/tag-perguntas/:tagPerguntaId')
		.get(tagPerguntas.read)
		.put(users.requiresLogin, tagPerguntas.hasAuthorization, tagPerguntas.update)
		.delete(users.requiresLogin, tagPerguntas.hasAuthorization, tagPerguntas.delete);

	// Finish by binding the Tag pergunta middleware
	app.param('tagPerguntaId', tagPerguntas.tagPerguntaByID);
};
