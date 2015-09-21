'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Tarefa=mongoose.model('Tarefa'),
	errorHandler=require('./errors.server.controller'),
    _ = require('lodash');

/**
 * Create a Tarefa
 */
exports.create = function(req, res) {
	var tarefa=new Tarefa(req.body);
	tarefa.save(function(err){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		res.status(201).json(tarefa);
	});

};

/**
 * Show the current Tarefa
 */
exports.read = function(req, res) {
	Tarefa.findById(req.params.tarefaId).exec(function(err,tarefa){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!tarefa){
			return res.status(404).send({message:'Tarefa nao encontrada'});
		}
		 res.status(201).json(tarefa);

	});

};

/**
 * Update a Tarefa
 */
exports.update = function(req, res) {
	var tarefa=req.tarefa;
	tarefa=_.extend(tarefa,req.body);
	tarefa.save(function(err){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		res.status(201).json(tarefa);
	});
};

/**
 * Delete an Tarefa
 */
exports.delete = function(req, res) {

	var tarefa=req.tarefa;
	tarefa.remove(function(err){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!tarefa){
			return res.status(404).send({message:'A tarefa nao foi encontrada'});
		}
		res.status(201).json(tarefa);
	});
};

/**
 * List of Tarefas
 */
exports.list = function(req, res) {
	Tarefa.find().exec(function(err,membros){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		res.json(membros);
	});

};

/** 
* Filter tasks by date
*/
exports.filterDate= function(req,res){
	Tarefa.find({prazo:req.data}).exec(function(err,membros){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		res.json(membros);
	});
};