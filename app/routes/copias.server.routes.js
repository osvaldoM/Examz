'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...


	var copias=require('../../app/controllers/copias.server.controller');

	//Every request without a parameter
	app.route('/copias')
		.get(copias.list)
		.post(copias.create);

		/**
		*every request with a copiaId parameter
		*/ 
	app.route('/copias/:copiaId')
		.get(copias.read)
		.put(copias.update)
		.delete(copias.delete);
};