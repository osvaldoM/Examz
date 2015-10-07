'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Resolucao Schema
 */
var ResolucaoSchema = new Schema({
	pontos: {
		type: String,
		default: '',
		//required: 'Please fill Resolucao name',
		trim: true
	},
	tempo: {
		type: Date,
		default: Date.now,
		//required: 'Please fill Resolucao name',
		trim: true
	},
	certas: {
		type: Number,
		default: '',
		//required: 'Please fill Resolucao name',
		trim: true
	},
	erradas: {
		type: Number,
		default: '',
		//required: 'Please fill Resolucao name',
		trim: true
	},
	resolvidas: {
		type: Number,
		default: '',
		//required: 'Please fill Resolucao name',
		trim: true
	},
     nResolvidas: {
		type: Number,
		default: '',
		//required: 'Please fill Resolucao name',
		trim: true
	},
	
	created: {
		type: Date,
		default: Date.now
	},
	exame: {
		type: Schema.ObjectId,
		ref: 'Exame'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Resolucao', ResolucaoSchema);