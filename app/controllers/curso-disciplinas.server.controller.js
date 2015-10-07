'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	CursoDisciplina = mongoose.model('CursoDisciplina'),
	_ = require('lodash');

/**
 * Create a Curso disciplina
 */
exports.create = function(req, res) {
	var cursoDisciplina = new CursoDisciplina(req.body);
	cursoDisciplina.user = req.user;

	cursoDisciplina.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cursoDisciplina);
		}
	});
};

/**
 * Show the current Curso disciplina
 */
exports.read = function(req, res) {
	res.jsonp(req.cursoDisciplina);
};

/**
 * Update a Curso disciplina
 */
exports.update = function(req, res) {
	var cursoDisciplina = req.cursoDisciplina ;

	cursoDisciplina = _.extend(cursoDisciplina , req.body);

	cursoDisciplina.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cursoDisciplina);
		}
	});
};

/**
 * Delete an Curso disciplina
 */
exports.delete = function(req, res) {
	var cursoDisciplina = req.cursoDisciplina ;

	cursoDisciplina.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cursoDisciplina);
		}
	});
};

/**
 * List of Curso disciplinas
 */
exports.list = function(req, res) { 
	CursoDisciplina.find().sort('-created').populate('user', 'displayName').exec(function(err, cursoDisciplinas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cursoDisciplinas);
		}
	});
};

/**
 * Curso disciplina middleware
 */
exports.cursoDisciplinaByID = function(req, res, next, id) { 
	CursoDisciplina.findById(id).populate('user', 'displayName').exec(function(err, cursoDisciplina) {
		if (err) return next(err);
		if (! cursoDisciplina) return next(new Error('Failed to load Curso disciplina ' + id));
		req.cursoDisciplina = cursoDisciplina ;
		next();
	});
};

/**
 * Curso disciplina authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.cursoDisciplina.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
