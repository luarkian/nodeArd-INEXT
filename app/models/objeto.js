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
	}
});

mongoose.model('objetosSchema',objeto);