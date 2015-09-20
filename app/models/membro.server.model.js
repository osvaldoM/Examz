'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Membro Schema
 */
var MembroSchema = new Schema({
	// Membro model fields   
	// ...

	nome:{
		type:String,
		default:' ',
		required:'O nome nao pode estar vazio'
	},
	cargo:{
		type:String,
		default:'nenhum'
	},
	username:{
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username',
		trim: true
	},
	password:{
		type:String,
		required:'A senha nao pode ser vazia'
	}
});

mongoose.model('Membro', MembroSchema);