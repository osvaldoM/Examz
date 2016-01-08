'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Exame Schema
 */
var ExameSchema = new Schema({
	ano: {
		type: Number,
		default: '1990',
		//required: 'Please fill Exame name',
		trim: true
	},


	tempo: {
		type: Number,
		default: '',
		//required: 'Please fill Exame name',
		trim: true
	},
	instrucoes: {
		type: String,
		default: '',
		//required: 'Please fill Exame name',
		trim: true
	},
	_perguntas: [{
		type: Schema.ObjectId,
		ref: 'Pergunta'
	}],
	_cursos: [{
		type: Schema.ObjectId,
		ref: 'Curso'
	}],
	created: {
		type: Date,
		default: Date.now
	},
	disciplina:{
		type:Schema.ObjectId,
		ref:'Disciplina'
	}
		//nome:this.disciplina+''+this.ano
});

	//var deepPopulate=require('mongoose-deep-populate')(mongoose);
	//ExameSchema.plugin(deepPopulate);

mongoose.model('Exame', ExameSchema);