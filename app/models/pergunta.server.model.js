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
		//required: 'Please fill Pergunta descriptiom',
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
	_exame: {
		type: Schema.ObjectId,
		ref: 'Exame'
	},
	_ajuda: [{
		type: Schema.ObjectId,
		ref: 'Ajuda'
	}],
	_alternativas:[{
		type:Schema.ObjectId,
		ref:'Alternativa'
	}]
});

mongoose.model('Pergunta', PerguntaSchema);