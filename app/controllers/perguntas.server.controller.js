'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pergunta = mongoose.model('Pergunta'),
	_ = require('lodash');

/**
 * Create a Pergunta
 */
exports.create = function(req, res) {
	var pergunta = new Pergunta(req.body);
	pergunta.user = req.user;

	pergunta.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pergunta);
		}
	});
};

/**
 * Show the current Pergunta
 */
exports.read = function(req, res) {
	res.jsonp(req.pergunta);
};

/**
 * Update a Pergunta
 */
exports.update = function(req, res) {
	var pergunta = req.pergunta ;

	pergunta = _.extend(pergunta , req.body);

	pergunta.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pergunta);
		}
	});
};


exports.listar = function(req, res) {

Pergunta.find().select('id texto').exec(function (err,perguntas) {
	// body...
	if(err){
		return res.status(400).send({message:errorHandler.getErrorMessage(err)});
	}
	else{
		res.json(perguntas);
	}
});
};
/**
 * Delete an Pergunta
 */
exports.delete = function(req, res) {
	var pergunta = req.pergunta ;

	pergunta.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pergunta);
		}
	});
};

/**
 * List of Perguntas
 */
exports.list = function(req, res) { 
	Pergunta.find().sort('-created').populate('user', 'displayName').exec(function(err, perguntas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perguntas);
		}
	});
};


exports.list = function(req, res) { 
	Pergunta.find().sort('-created').populate('user', 'displayName').exec(function(err, perguntas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perguntas);
		}
	});
};

/**
 * Pergunta middleware
 */
exports.perguntaByID = function(req, res, next, id) { 
	Pergunta.findById(id).populate('user', 'displayName').exec(function(err, pergunta) {
		if (err) return next(err);
		if (! pergunta) return next(new Error('Failed to load Pergunta ' + id));
		req.pergunta = pergunta ;
		next();
	});
};

/**
 * Pergunta authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pergunta.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
