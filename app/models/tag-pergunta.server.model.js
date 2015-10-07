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
	name: {
		type: String,
		default: '',
		required: 'Please fill Tag pergunta name',
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

mongoose.model('TagPergunta', TagPerguntaSchema);