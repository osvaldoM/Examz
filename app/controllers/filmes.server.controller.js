'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Filme=mongoose.model('Filme'),
    _ = require('lodash');

/**
 * Create a Filme
 */
exports.create = function(req, res) {
	var filme = new Filme(req.body);

		filme.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(filme);
		}
	});
};

/**
 * Show the current Filme
 */
exports.read = function(req, res) {
	Filme.findById(req.params.filmeId).populate('actorPrincipal').exec(function(err,filme){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!filme){
			return res.status(404).send({message:'Filme nao encontrado'});
		}
		 
		 res.status(201).json(filme);

	});
};

/**
 * Update a Filme
 */
exports.update = function(req, res) {
	var filme=req.filme;
	filme=_.extend(filme,req.body);
	filme.save(function(err){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		res.status(201).json(filme);
	});
};

/**
 * Delete an Filme
 */
exports.delete = function(req, res) {

	var filme=req.filme;
	filme.remove(function(err){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!filme){
			return res.status(404).send({message:'O filme n foi encontrado'});
		}
		res.status(201).json(filme);
	});
};

/**
 * List of Filmes
 */
exports.list = function(req, res) {
	Filme.find().exec(function(err,filmes){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		res.json(filmes);

	});

};

