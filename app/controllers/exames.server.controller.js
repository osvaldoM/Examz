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

/**
 * Show the current Exame
 */
exports.read = function(req, res) {
	res.jsonp(req.exame);
};

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
	Exame.find().sort('-created').populate('user', 'displayName').exec(function(err, exames) {
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
 * Exame middleware
 */
exports.exameByID = function(req, res, next, id) { 
	Exame.findById(id).populate('user', 'displayName').exec(function(err, exame) {
		if (err) return next(err);
		if (! exame) return next(new Error('Failed to load Exame ' + id));
		req.exame = exame ;
		next();
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
