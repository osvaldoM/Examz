'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pergunta = mongoose.model('Pergunta'),
	Exame = require('./exames.server.controller'),
	_ = require('lodash');

/**
 * Create a Pergunta
 */
exports.create = function(req, res) {
		// console.log('AT create');
	var pergunta = new Pergunta(req.body);
	pergunta.user = req.user;
	var exame=pergunta._exame;
	console.log('valor '+exame);

	pergunta.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			Exame.addPergunta(exame,pergunta.id);
			res.jsonp(pergunta);
		}
	});
};


exports.addAlternativa= function(perguntaId,alternativaId){
	
	Pergunta.findById(perguntaId).exec(function(err,pergunta){
		if(err){
			console.log('erro finding question`');
			return;
		}
		else{
			if(!pergunta){
			console.log('erro finding question`');
			return;
			}
			var pergunta1=pergunta.toObject();
			pergunta1._alternativas.push(alternativaId);
			pergunta = _.extend(pergunta ,pergunta1);

			pergunta.save(function(err) {
				if (err) {
					console.log('erro ao salvar');
					return; 
					
				} else {
					console.log('sucesso');
				}
			});

		}
	});
};



exports.addAjuda=function(perguntaId,ajudaId){
	
	Pergunta.findById(perguntaId).exec(function(err,pergunta){
		if(err){
			console.log('erro finding question`');
			return;
		}
		else{
			if(!pergunta){
			console.log('erro finding question`');
			return;
			}
			var pergunta1=pergunta.toObject();
			pergunta1._ajuda.push(ajudaId);
			pergunta = _.extend(pergunta ,pergunta1);

			pergunta.save(function(err) {
				if (err) {
					console.log('erro ao salvar');
					return; 
					
				} else {
					console.log('sucesso');
				}
			});

		}
	});
};

/**
 * Show the current Pergunta
 */
exports.read = function(req, res) {
			// console.log('AT read '+req.params.perguntaId);
			//removed populating options for testing purposes.. but ill find them here
//	Pergunta.findById(req.params.perguntaId).populate('_alternativas  _ajudas ').populate({path:'_alternativas.user',model:'User'}).exec(function(err,pergunta){

	Pergunta.findById(req.params.perguntaId).exec(function(err,pergunta){
		if(err){
			res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		else{
		if(!pergunta){
			res.status(404).send({message:'Pergunta nap encontrada'});
			}
			// var promise = doc.
			//   populate('company').
			//   populate({
			//     path: 'notes',
			//     match: /airline/,
			//     select: 'text',
			//     model: 'modelName'
			//     options: opts
			//   }).
			//   execPopulate();

			// // summary
			// doc.execPopulate()
			res.json(pergunta);
		}
	});
};

//returns an asked pergunta without population
exports.readOrigi = function(req, res) {
			// console.log('AT read '+req.params.perguntaId);
			console.log('id eh '+req.query.perguntaId);

	// Pergunta.findById(req.query.perguntaId).exec(function(err,pergunta){
	// 	if(err){
	// 		res.status(201).send({message:errorHandler.getErrorMessage(err)});
	// 	}
	// 	else{
	// 	if(!pergunta){
	// 		res.status(404).send({message:'Pergunta nao encontrada'});
	// 		}
	// 		res.json(pergunta);
	// 	}
	// });
res.json('ola');
};

exports.byExame = function(req, res) {
	// console.log('AT SEARCHBYID');
	Pergunta.find({'_exame':req.params.perguntaId}).populate('_alternativas  _ajudas ').populate({path:'_alternativas.user',model:'User'}).exec(function(err,pergunta){
		if(err){
			res.status(202).send({message:errorHandler.getErrorMessage(err)});
		}
		else{
		if(!pergunta){
			res.status(404).send({message:'Pergunta nap encontrada'});
			}
			// var promise = doc.
			//   populate('company').
			//   populate({
			//     path: 'notes',
			//     match: /airline/,
			//     select: 'text',
			//     model: 'modelName'
			//     options: opts
			//   }).
			//   execPopulate();

			// // summary
			// doc.execPopulate()
			res.jsonp(pergunta);
		}
	});
};


/**
 * Update a Pergunta
 */
exports.update = function(req, res) {
	var pergunta = req.pergunta ;
	console.log('AT update:'+pergunta);

	pergunta = _.extend(pergunta , req.body);

	pergunta.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pergunta);
		}
	});
};


exports.listar = function(req, res) {
console.log('at listar');
Pergunta.find().select('id texto').exec(function (err,perguntas) {
	// body...
	console.log(err);
	if(err){
		return res.status(404).send({message:errorHandler.getErrorMessage(err)});
	}
	else{
		res.json(perguntas);
	}
});
};
/**
 * Delete an Pergunta
 */
exports.delete = function(req, res) {
	var pergunta = req.pergunta ;

	pergunta.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pergunta);
		}
	});
};

/**
 * List of Perguntas
 */
exports.list = function(req, res) { 
	Pergunta.find().sort('-created').populate('user', 'displayName').exec(function(err, perguntas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perguntas);
		}
	});
};


// exports.list = function(req, res) { 
// 	Pergunta.find().sort('-created').populate('user', 'displayName').exec(function(err, perguntas) {
// 		if (err) {
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(perguntas);
// 		}
// 	});
// };

/**
 * Pergunta middleware (used when updating)
 */
exports.perguntaByID = function(req, res, next, id) { 
	Pergunta.findById(id).populate('user', 'displayName').exec(function(err, pergunta) {
		if (err) return next(err);
		if (! pergunta) return next(new Error('Failed to load Pergunta ' + id));
		req.pergunta = pergunta ;
		next();
	});
};

/**
 * Pergunta authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pergunta.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
