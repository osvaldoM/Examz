'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Ajuda = mongoose.model('Ajuda'),
	Pergunta = require('./perguntas.server.controller'),
	_ = require('lodash');

/**
 * Create a Ajuda
 */
exports.create = function(req, res) {
	var ajuda = new Ajuda(req.body);
	ajuda.user = req.user;

	ajuda.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			Pergunta.addAjuda(ajuda.pergunta,ajuda.id);
			res.jsonp(ajuda);
		}
	});
};

/**
 * Show the current Ajuda
 */
exports.read = function(req, res) {
	res.jsonp(req.ajuda);
};

/**
 * Update a Ajuda
 */
exports.update = function(req, res) {
	var ajuda = req.ajuda ;

	ajuda = _.extend(ajuda , req.body);

	ajuda.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ajuda);
		}
	});
};

/**
 * Delete an Ajuda
 */
exports.delete = function(req, res) {
	var ajuda = req.ajuda ;

	ajuda.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ajuda);
		}
	});
};

/**
 * List of Ajudas
 */
exports.list = function(req, res) { 
	Ajuda.find().sort('-created').populate('user', 'displayName').exec(function(err, ajudas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ajudas);
		}
	});
};

/**
 * Ajuda middleware
 */
exports.ajudaByID = function(req, res, next, id) { 
	Ajuda.findById(id).populate('user', 'displayName').exec(function(err, ajuda) {
		if (err) return next(err);
		if (! ajuda) return next(new Error('Failed to load Ajuda ' + id));
		req.ajuda = ajuda ;
		next();
	});
};

/**
 * Ajuda authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ajuda.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
