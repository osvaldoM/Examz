'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Alternativa Schema
 */
var AlternativaSchema = new Schema({
	conteudo: {
		type: String,
		default: '',
		//required: 'Please fill Alternativa conteudo',
		trim: true
	},

	isCorrect: {
		type: Boolean,
		default: '',
		//required: 'Please fill Alternativa isCorrect',
		trim: true
	},
	letra: {
		type: String,
		default: '',
		//required: 'Please fill Alternativa letra',
		trim: true
	},
	imagem: {
		type: String,
		default: '',
		//required: 'Please fill Alternativa imagen',
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

mongoose.model('Alternativa', AlternativaSchema);