const mongoose = require('mongoose');
const schema = mongoose.Schema;

const admin = new schema ({
	nome:{
		type: String,
		required: true
	},
	email:{
		type:String,
		required:false
	},
});

mongoose.model('adminSchema',admin);