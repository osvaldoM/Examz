'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Copia Schema
 */
var CopiaSchema = new Schema({
	// Copia model fields   
	// ...
	filme:{
		type:Schema.ObjectId,
		ref:'Filme'
	},
	estado:{
		type:String,
		default:'bom'
	}, //1 for available, 0 for being used 
	livre:{
		type:Boolean,
		default:true
	}
});

mongoose.model('Copia', CopiaSchema);