'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ajuda Schema
 */
var AjudaSchema = new Schema({
	tipo: {
		type: String,
		default: '',
		//required: 'Please fill Ajuda name',
		trim: true
	},

	tutulo: {
		type: String,
		default: '',
		//required: 'Please fill Ajuda name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	pergunta: {
		type: Schema.ObjectId,
		ref: 'Pergunta'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Ajuda', AjudaSchema);