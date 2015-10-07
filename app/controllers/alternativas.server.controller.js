'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Alternativa = mongoose.model('Alternativa'),
	_ = require('lodash');

/**
 * Create a Alternativa
 */
exports.create = function(req, res) {
	var alternativa = new Alternativa(req.body);
	alternativa.user = req.user;

	alternativa.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(alternativa);
		}
	});
};

/**
 * Show the current Alternativa
 */
exports.read = function(req, res) {
	res.jsonp(req.alternativa);
};

/**
 * Update a Alternativa
 */
exports.update = function(req, res) {
	var alternativa = req.alternativa ;

	alternativa = _.extend(alternativa , req.body);

	alternativa.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(alternativa);
		}
	});
};

/**
 * Delete an Alternativa
 */
exports.delete = function(req, res) {
	var alternativa = req.alternativa ;

	alternativa.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(alternativa);
		}
	});
};

/**
 * List of Alternativas
 */
exports.list = function(req, res) { 
	Alternativa.find().sort('-created').populate('user', 'displayName').exec(function(err, alternativas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(alternativas);
		}
	});
};

/**
 * Alternativa middleware
 */
exports.alternativaByID = function(req, res, next, id) { 
	Alternativa.findById(id).populate('user', 'displayName').exec(function(err, alternativa) {
		if (err) return next(err);
		if (! alternativa) return next(new Error('Failed to load Alternativa ' + id));
		req.alternativa = alternativa ;
		next();
	});
};

/**
 * Alternativa authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.alternativa.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
