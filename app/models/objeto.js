const mongoose = require('mongoose');
const schema = mongoose.Schema;

const objeto = new schema ({
	nome:{
		type: String,
		required: true
	},
	tagRFID:{
		type: String,
		required: true
	},
	descricao:{
		type: String,
		required: false
	},
	tombo:{
		type: Number,
		required: false
	},
	sala:{
		type: String,
		required: true
	},
	restrincao:{
		type:String,
		required:false
	},
	alerta:{
		type: Number,
		required:true,
		default:0
	}
});

mongoose.model('objetosSchema',objeto);