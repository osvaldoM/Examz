'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler=require('./errors.server.controller'),
	Copia=require('./copias.server.controller'),
	Emprestimo=mongoose.model('Emprestimo'),
    _ = require('lodash');

/**
 * Create a Emprestimo
 */
 var countEmp=function(clienteId,cb){

 	Emprestimo.count({'cliente':clienteId}).exec(function(err,nrEmp){
 		if(err){
 			return errorHandler.getErrorMessage(err);
 		}
 		console.log(nrEmp);
 		if(nrEmp>30)
 		return cb(false);
 		else return cb(true);
 	});
 // return true;
 };

exports.create = function(req, res) {
	var emprestimo = new Emprestimo(req.body);
		//verificar nr de emps  
		countEmp(emprestimo.cliente,function(estado){
				//if nr of loans less then 3 
			if(estado===true){ console.log('entrou');
				Copia.tiraCopia(emprestimo.filme,function(idCopia){
					console.log('emprestado '+idCopia);
					//gotta check if id is an error
					// if(idCopia){
					// 	return res.status(400).send({
					// 		message: errorHandler.getErrorMessage(err)
					// 	});
					// }
					if(idCopia===0)
						return res.status(404).send({
							message: 'Nao exitem copias livres para este filme'
						});
					else{
						//update the emprestimo with a copy
						var emprestimo1=emprestimo.toObject();
						emprestimo1.copia=idCopia;
						emprestimo=_.extend(emprestimo,emprestimo1);
						//save the emprestimo
							emprestimo.save(function(err) {
							if (err) {
								console.log('error here '+err);
								return res.status(400).send({
									message: errorHandler.getErrorMessage(err)
								});
							} else {
								res.jsonp(emprestimo);
							}
						});
						//end of save the loan
					}
				});
			}
			else { console.log('nada');
				return res.status(400).send({message:'nr de emp maior q 3'});}
		}); 

};

/**
 * Show the current Emprestimo
 */
exports.read = function(req, res) {
	Emprestimo.findById(req.params.emprestimoId).populate('actorPrincipal').exec(function(err,emprestimo){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!emprestimo){
			return res.status(404).send({message:'Emprestimo nao encontrado'});
		}
		 
		 res.status(201).json(emprestimo);

	});
};

/**
 * Update a Emprestimo
 */
exports.update = function(req, res) {
	var emprestimo=req.emprestimo;
	emprestimo=_.extend(emprestimo,req.body);
	emprestimo.save(function(err){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		res.status(201).json(emprestimo);
	});
};

/**
 * Delete an Emprestimo
 */
exports.delete = function(req, res) {

	var emprestimo=req.emprestimo;
	emprestimo.remove(function(err){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!emprestimo){
			return res.status(404).send({message:'O emprestimo n foi encontrado'});
		}
		res.status(201).json(emprestimo);
	});
};

/**
 * List of Emprestimos
 */
exports.list = function(req, res) {
	Emprestimo.find().exec(function(err,emprestimos){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		res.json(emprestimos);

	});

};

//marca o estado do emprestimo como devolvido
exports.devolve=function(emprestimoId){
	Emprestimo.findById(emprestimoId).exec(function(err,emp){
		if(err){
			console.log('erro finding loan');
			return;
		}
		else{
			if(!emp){
			console.log('erro finding loan');
			return;
			}
			var emp1=emp.toObject();
			emp1.devolvido=true;
			emp = _.extend(emp ,emp1);
			var copiaId=emp1.copia;

			emp.save(function(err) {
				if (err) {
					console.log('erro ao salvar');
					return; 
					
				} else {
					console.log('sucesso');
					Copia.poeCopia(copiaId);
				}
			});

		}
	});
};

exports.byData = function(req, res) {
	console.log('data '+req.query.data);
	Emprestimo.find({'dataDev':req.query.data}).populate('actorPrincipal').exec(function(err,emprestimo){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!emprestimo){
			return res.status(404).send({message:'Emprestimo nao encontrado'});
		}
		 
		 res.status(201).json(emprestimo);

	});
};

