'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Copia=mongoose.model('Copia'),
    _ = require('lodash');

/**
 * Create a Copia
 */
exports.create = function(req, res) {
	var copia = new Copia(req.body);

		copia.save(function(err){
		if (err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(copia);
		}
	});
};

/**
 * Show the current Copia
 */
exports.read = function(req, res) {
	Copia.findById(req.params.copiaId).populate('actorPrincipal').exec(function(err,copia){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!copia){
			return res.status(404).send({message:'Copia nao encontrado'});
		}
		 
		 res.status(201).json(copia);

	});
};

/**
 * Update a Copia
 */
exports.update = function(req, res) {
	var copia=req.copia;
	copia=_.extend(copia,req.body);
	copia.save(function(err){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		res.status(201).json(copia);
	});
};

/**
 * Delete an Copia
 */
exports.delete = function(req, res) {

	var copia=req.copia;
	copia.remove(function(err){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!copia){
			return res.status(404).send({message:'O copia n foi encontrado'});
		}
		res.status(201).json(copia);
	});
};

/**
 * List of Copias
 */
exports.list = function(req, res) {
	Copia.find().exec(function(err,copias){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		res.json(copias);

	});

};


//remove uma determinada copia do stock das livres e devolve a mesma

/*
	return 'err' for error 
	return id for success
	return 0 for empty
*/
exports.tiraCopia= function(filmeId,cb){
	console.log("filme recebido "+filmeId)
	Copia.findOne({'livre':true,filme:filmeId}).exec(function(err,copia){
		if(err){
			return cb(err);
		}
		if(!copia){
			console.log('houve erro');
			return cb('0');
		}
		var cop1= copia.toObject();
		cop1.livre=false;
		copia=_.extend(copia,cop1);
		copia.save(function(err){
			if(err)	{
				console.log('erro ao salvar');
				return cb(err);
			}
				return cb(copia.id);			
		});


	});		
}

exports.poeCopia= function(copiaId){
	console.log("copia recebida "+copiaId)
	Copia.findById(copiaId).exec(function(err,copia){
		if(err){
			return err;
		}
		if(!copia){
			console.log('houve erro');
			return 0;
		}
		var cop1= copia.toObject();
		cop1.livre=true;
		copia=_.extend(copia,cop1);
		copia.save(function(err){
			if(err)	{
				console.log('erro ao salvar');
				return (err);
			}
				return (copia.id);			
		});


	});		
}