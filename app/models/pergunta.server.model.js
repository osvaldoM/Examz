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
		required: 'Please fill Pergunta descriptiom',
		trim: true
	},

	imagem: {
		type: String,
		default: '',
		//required: 'Please fill Pergunta name',
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
	ajuda: [{
		type: Schema.ObjectId,
		ref: 'Ajuda'
	}]
});

mongoose.model('Pergunta', PerguntaSchema);