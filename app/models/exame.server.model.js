'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Exame Schema
 */
var ExameSchema = new Schema({
	ano: {
		type: Number,
		default: '',
		//required: 'Please fill Exame name',
		trim: true
	},


	tempo: {
		type: Number,
		default: '',
		//required: 'Please fill Exame name',
		trim: true
	},
	instrucoes: {
		type: String,
		default: '',
		//required: 'Please fill Exame name',
		trim: true
	},
	nrPerguntas: {
		type: String,
		default: '',
		required: 'Please fill Exame name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Exame', ExameSchema);