'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Curso disciplina Schema
 */
var CursoDisciplinaSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	curso: {
		type: Schema.ObjectId,
		ref: 'Curso'
	},

	disciplina: {
		type: Schema.ObjectId,
		ref: 'Disciplina'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('CursoDisciplina', CursoDisciplinaSchema);