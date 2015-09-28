'use strict';

module.exports = function(app) {
	    var membros = require('../../app/controllers/membros.server.controller');
	// Routing logic   
	// ...
	app.route('/membros')
		.get(membros.list)
		.post(membros.create);

	app.route('/membros/listar')
		.get(membros.listar);


	// the categoryId param is added to the params object for the request
   app.route('/membros/:membroId')
    .get(membros.read)
    .put(membros.update)
    .delete(membros.delete);

   app.param('membroId', membros.membroByID);
		/*.get(function (request,response) {
			// body...
			//response.json([{name:'chris',cargo:'fiteiro',username:'chrisC',password:'senha2'}]);
			.get(membros.list);
		});*/
};