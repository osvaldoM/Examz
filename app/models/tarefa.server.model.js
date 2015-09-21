'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tarefa Schema
 */
var TarefaSchema = new Schema({
	// Tarefa model fields   
	// ...

	titulo:{
		type:String,
		default:'',
		required:'title is required'
	},
	descriccao:{
		type:String,
		default:''
	},
	prazo:{
		type:Date,
		default:Date.now
	},
	membro:{
		required:'eh necessario associar a Tarefa a um membro',
		type:Schema.ObjectId,
		ref:'Membro'
	}
});

mongoose.model('Tarefa', TarefaSchema);