const mongoose = require('mongoose');
const schema = mongoose.Schema;

const objeto = new schema ({
	nome:{
		type: String,
		required: true,
		default:'Desconhecido'
	},
	tagRFID:{
		type: String,
		required: true
	},
	descriçao:{
		type: String,
		required: false
	},
	tombo:{
		type: Number,
		required: true,
		default:'Desconhecido'
	},
	sala:{
		type: String,
		required: true
	}
});

mongoose.model('objetosSchema',objeto);