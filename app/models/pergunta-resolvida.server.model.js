'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pergunta resolvida Schema
 */
var PerguntaResolvidaSchema = new Schema({
	estado: {
		type: String,
		default: '',
		required: 'Please fill Pergunta resolvida name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	resolucao: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('PerguntaResolvida', PerguntaResolvidaSchema);