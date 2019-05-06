const mongoose = require('mongoose');
const schema = mongoose.Schema;

const sala = new schema ({
	nome:{
		type: String,
		required: true,
	},
	bloco:{
		type: String,
		required:false,
		default:'UFRR'
	}
});

mongoose.model('salaSchema',sala);