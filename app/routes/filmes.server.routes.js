'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var filmes=require('../../app/controllers/filmes.server.controller');

	//Every request without a parameter
	app.route('/filmes')
		.get(filmes.list)
		.post(filmes.create);

		/**
		*every request with a filmeId parameter
		*/ 
	app.route('/filmes/:filmeId')
		.get(filmes.read)
		.put(filmes.update)
		.delete(filmes.delete);
};