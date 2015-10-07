'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PerguntaResolvida = mongoose.model('PerguntaResolvida'),
	_ = require('lodash');

/**
 * Create a Pergunta resolvida
 */
exports.create = function(req, res) {
	var perguntaResolvida = new PerguntaResolvida(req.body);
	perguntaResolvida.user = req.user;

	perguntaResolvida.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perguntaResolvida);
		}
	});
};

/**
 * Show the current Pergunta resolvida
 */
exports.read = function(req, res) {
	res.jsonp(req.perguntaResolvida);
};

/**
 * Update a Pergunta resolvida
 */
exports.update = function(req, res) {
	var perguntaResolvida = req.perguntaResolvida ;

	perguntaResolvida = _.extend(perguntaResolvida , req.body);

	perguntaResolvida.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perguntaResolvida);
		}
	});
};

/**
 * Delete an Pergunta resolvida
 */
exports.delete = function(req, res) {
	var perguntaResolvida = req.perguntaResolvida ;

	perguntaResolvida.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perguntaResolvida);
		}
	});
};

/**
 * List of Pergunta resolvidas
 */
exports.list = function(req, res) { 
	PerguntaResolvida.find().sort('-created').populate('user', 'displayName').exec(function(err, perguntaResolvidas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perguntaResolvidas);
		}
	});
};

/**
 * Pergunta resolvida middleware
 */
exports.perguntaResolvidaByID = function(req, res, next, id) { 
	PerguntaResolvida.findById(id).populate('user', 'displayName').exec(function(err, perguntaResolvida) {
		if (err) return next(err);
		if (! perguntaResolvida) return next(new Error('Failed to load Pergunta resolvida ' + id));
		req.perguntaResolvida = perguntaResolvida ;
		next();
	});
};

/**
 * Pergunta resolvida authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.perguntaResolvida.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
