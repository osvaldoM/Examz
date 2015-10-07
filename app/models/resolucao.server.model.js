'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Resolucao Schema
 */
var ResolucaoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Resolucao name',
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

mongoose.model('Resolucao', ResolucaoSchema);