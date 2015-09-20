'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tarefa Schema
 */
var TarefaSchema = new Schema({
	// Tarefa model fields   
	// ...
});

mongoose.model('Tarefa', TarefaSchema);