'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Curso Schema
 */
var CursoSchema = new Schema({
	designacao: {
		type: String,
		default: '',
		required: 'Please fill Curso designacao',
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

mongoose.model('Curso', CursoSchema);