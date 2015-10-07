'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tag pergunta Schema
 */
var TagPerguntaSchema = new Schema({
	
	created: {
		type: Date,
		default: Date.now
	},

	pergunta: {
		type: Schema.ObjectId,
		ref: 'Pergunta'
	},
	tag: {
		type: Schema.ObjectId,
		ref: 'Tag'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('TagPergunta', TagPerguntaSchema);