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

	titulo: {
		type: String,
		default: '',
		//required: 'Please fill Ajuda name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	_pergunta: {
		type: Schema.ObjectId,
		ref: 'Pergunta',
		required:'Um ajuda tem de estar associado a uma Pergunta'
	}
});

mongoose.model('Ajuda', AjudaSchema);