'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Exame = mongoose.model('Exame'),
	_ = require('lodash');

/**
 * Create a Exame
 */
exports.create = function(req, res) {
	var exame = new Exame(req.body);
	exame.user = req.user;

	exame.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(exame);
		}
	});
};

exports.addPergunta= function(exameId,perguntaId){

	Exame.findById(exameId).exec(function(err,exame){
		if(err){
			console.log('erro finding exam first');
			return;
		}
		else{
			if(!exame){
			console.log('exam not found'+exameId);
			return;
			}
			var exame1=exame.toObject();
			exame1._perguntas.push(perguntaId);
			exame = _.extend(exame , exame1);

			exame.save(function(err) {
				if (err) {
					console.log('erro ao salvar');
					return; 
					
				} else {
					console.log('sucesso');
				}
			});

		}
	});




};

exports.listar = function(req, res) {

Exame.find().select('id ano').exec(function (err,exames) {
	// body...
	if(err){
		return res.status(400).send({message:errorHandler.getErrorMessage(err)});
	}
	else{
		res.json(exames);
	}
});
};

/**
 * Show the current Exame
 */
exports.read = function(req, res) {
	
	Exame.findById(req.params.exameId).populate('_perguntas').exec(function(err,exame){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		else{
			if(!exame){
				return res.status(404).send({message:'Exame nao encontrado'});
			}
			res.json(exame);
		}
	});

};

/**
 * Exame middleware
 */
// exports.exameByID = function(req, res, next, id) { 
// 	 Exame.findById(id).populate('_perguntas').exec(function(err, exame) {
// 	//Exame.findById(id).deepPopulate('_perguntas.alternativas').exec(function(err, exame) {
// 		if (err) return next(err);
// 		if (! exame) return next(new Error('Failed to load Exame ' + id));
// 		req.exame = exame ;
// 		next();
// 	});
// };


/**
 * Update a Exame
 */
exports.update = function(req, res) {
	var exame = req.exame ;

	exame = _.extend(exame , req.body);

	exame.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(exame);
		}
	});
};

/**
 * Delete an Exame
 */
exports.delete = function(req, res) {
	var exame = req.exame ;

	exame.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(exame);
		}
	});
};

/**
 * List of Exames
 */
exports.list = function(req, res) { 
	Exame.find().select('id ano disciplina').populate('disciplina','name').sort({ano:-1}).exec(function(err, exames) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(exames);
		}
	});
};


/**
 * Exame authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.exame.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
