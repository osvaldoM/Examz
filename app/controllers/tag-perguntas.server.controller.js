'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	TagPergunta = mongoose.model('TagPergunta'),
	_ = require('lodash');

/**
 * Create a Tag pergunta
 */
exports.create = function(req, res) {
	var tagPergunta = new TagPergunta(req.body);
	tagPergunta.user = req.user;

	tagPergunta.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tagPergunta);
		}
	});
};

/**
 * Show the current Tag pergunta
 */
exports.read = function(req, res) {
	res.jsonp(req.tagPergunta);
};

/**
 * Update a Tag pergunta
 */
exports.update = function(req, res) {
	var tagPergunta = req.tagPergunta ;

	tagPergunta = _.extend(tagPergunta , req.body);

	tagPergunta.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tagPergunta);
		}
	});
};

/**
 * Delete an Tag pergunta
 */
exports.delete = function(req, res) {
	var tagPergunta = req.tagPergunta ;

	tagPergunta.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tagPergunta);
		}
	});
};

/**
 * List of Tag perguntas
 */
exports.list = function(req, res) { 
	TagPergunta.find().sort('-created').populate('user', 'displayName').exec(function(err, tagPerguntas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tagPerguntas);
		}
	});
};

/**
 * Tag pergunta middleware
 */
exports.tagPerguntaByID = function(req, res, next, id) { 
	TagPergunta.findById(id).populate('user', 'displayName').exec(function(err, tagPergunta) {
		if (err) return next(err);
		if (! tagPergunta) return next(new Error('Failed to load Tag pergunta ' + id));
		req.tagPergunta = tagPergunta ;
		next();
	});
};

/**
 * Tag pergunta authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.tagPergunta.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
