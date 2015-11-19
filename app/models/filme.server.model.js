'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Filme Schema
 */
var FilmeSchema = new Schema({
	// Filme model fields   
	// ...
	titulo:{
		type:String,
		required:'titulo necessario'
	},
	sinopse:{
		type:String
	},
	categoria:{
		type:Schema.ObjectId,
		ref:'Category'
	},
	actorPrincipal:{
		type:Schema.ObjectId,
		ref:'User'
	},
	autor:{
		type:Schema.ObjectId,
		ref:'User'
	}
});

mongoose.model('Filme', FilmeSchema);