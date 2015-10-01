'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Tarefa = require('./tarefas.server.controller'),
	Membro=mongoose.model('Membro'),
    _ = require('lodash');

/**
 * Create a Membro
 */
exports.create = function(req, res) {
	var membro = new Membro(req.body);

	membro.save(function(err){
		if(err){
		return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		res.status(201).json(membro);
	});

};

/**
 * Show the current Membro
 */
exports.read = function(req, res) {
	Membro.findById(req.params.membroId).exec(function(err,membro){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		else{
			if(!membro){
				return res.status(404).send({message:'Membro nao encontrado'});
			}
			//var tarefas= Tarefa.get
			res.json(membro);
		}
	});

};

/**
 * Update a Membro
 */
exports.update = function(req, res) {
		var membro = req.membro;

	membro = _.extend(membro, req.body);

	membro.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(membro);
		}
	});

};

/**
 * Delete an Membro
 */
exports.delete = function(req, res) {
	var membro = req.membro;

	membro.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(membro);
		}
	});
};




/**
 * Article middleware
 */
exports.membroByID = function(req, res, next, id) {
	Membro.findById(id).exec(function(err, membro) {
		if (err) return new Membro({nome:'osvaldo',cargo:'chefe',username:'aaab',password:'dfdffd'}); //return next(err);
		if (!membro) return next(new Error('Failed to load article ' + id));
		req.membro = membro;
		next();
	});
};

/**
 * List of Membros
 */
exports.list = function(req, res) {

Membro.find().exec(function (err,membros) {
	// body...
	if(err){
		return res.status(400).send({message:errorHandler.getErrorMessage(err)});
	}
	else{
		var membrosT=new Array();
		membros.forEach(function(membro){
			membrosT.push(new Object({nome:'sdsd',_id:'dssdj',cargo:'sdd',username:'user',password:'ddsdsdssd', writable:true}));
		}); 
		for(var m in membrosT){
		m=_.extend(m,{conta:5,'nome':'aaa'});
		} 
		res.json(membrosT);
	}
});
};
exports.listar = function(req, res) {

Membro.find().select('id nome').exec(function (err,membros) {
	// body...
	if(err){
		return res.status(400).send({message:errorHandler.getErrorMessage(err)});
	}
	else{
		res.json(membros);
	}
});
};

/**
*Filter tasks by date
*/
exports.filerDate=function(req,res){
	
	
};



