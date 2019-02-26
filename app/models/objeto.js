var mongoose = require('mongoose');

var schema = mongoose.Schema({
	nome:{
		type: String,
		//required: true
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
		//required: true
	},
	sala:{
		type: String,
		required: true
	}
});

mongoose.model('objetosSchema',schema);