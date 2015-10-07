'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pergunta Schema
 */
var PerguntaSchema = new Schema({
	texto: {
		type: String,
		default: '',
		required: 'Please fill Pergunta name',
		trim: true
	},

	imagem: {
		type: String,
		default: '',
		required: 'Please fill Pergunta name',
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

mongoose.model('Pergunta', PerguntaSchema);