'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Disciplina = mongoose.model('Disciplina'),
	_ = require('lodash');

/**
 * Create a Disciplina
 */
exports.create = function(req, res) {
	var disciplina = new Disciplina(req.body);
	disciplina.user = req.user;

	disciplina.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(disciplina);
		}
	});
};

exports.listar = function(req, res) {

Disciplina.find().select('id name').exec(function (err,disciplinas) {
	// body...
	if(err){
		return res.status(400).send({message:errorHandler.getErrorMessage(err)});
	}
	else{
		res.json(disciplinas);
	}
});
};



/**
 * Show the current Disciplina
 */
exports.read = function(req, res) {
	res.jsonp(req.disciplina);
};

/**
 * Update a Disciplina
 */
exports.update = function(req, res) {
	var disciplina = req.disciplina ;

	disciplina = _.extend(disciplina , req.body);

	disciplina.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(disciplina);
		}
	});
};

/**
 * Delete an Disciplina
 */
exports.delete = function(req, res) {
	var disciplina = req.disciplina ;

	disciplina.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(disciplina);
		}
	});
};

/**
 * List of Disciplinas
 */
exports.list = function(req, res) { 
	Disciplina.find().sort('-created').populate('user', 'displayName').exec(function(err, disciplinas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(disciplinas);
		}
	});
};

/**
 * Disciplina middleware
 */
exports.disciplinaByID = function(req, res, next, id) { 
	Disciplina.findById(id).populate('user', 'displayName').exec(function(err, disciplina) {
		if (err) return next(err);
		if (! disciplina) return next(new Error('Failed to load Disciplina ' + id));
		req.disciplina = disciplina ;
		next();
	});
};

/**
 * Disciplina authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.disciplina.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
