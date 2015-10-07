'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Resolucao = mongoose.model('Resolucao'),
	_ = require('lodash');

/**
 * Create a Resolucao
 */
exports.create = function(req, res) {
	var resolucao = new Resolucao(req.body);
	resolucao.user = req.user;

	resolucao.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resolucao);
		}
	});
};

/**
 * Show the current Resolucao
 */
exports.read = function(req, res) {
	res.jsonp(req.resolucao);
};

/**
 * Update a Resolucao
 */
exports.update = function(req, res) {
	var resolucao = req.resolucao ;

	resolucao = _.extend(resolucao , req.body);

	resolucao.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resolucao);
		}
	});
};

/**
 * Delete an Resolucao
 */
exports.delete = function(req, res) {
	var resolucao = req.resolucao ;

	resolucao.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resolucao);
		}
	});
};

/**
 * List of Resolucaos
 */
exports.list = function(req, res) { 
	Resolucao.find().sort('-created').populate('user', 'displayName').exec(function(err, resolucaos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resolucaos);
		}
	});
};

/**
 * Resolucao middleware
 */
exports.resolucaoByID = function(req, res, next, id) { 
	Resolucao.findById(id).populate('user', 'displayName').exec(function(err, resolucao) {
		if (err) return next(err);
		if (! resolucao) return next(new Error('Failed to load Resolucao ' + id));
		req.resolucao = resolucao ;
		next();
	});
};

/**
 * Resolucao authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.resolucao.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
