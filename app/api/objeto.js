var mongoose = requiere('mongoose');

module.exports = function(app){
	var api = {};
	var model = mongoose.model('objetoSchema');

	api.identifica = function(req, res){

	};

	api.atualiza = function (req, res){

	};

	return api;
}