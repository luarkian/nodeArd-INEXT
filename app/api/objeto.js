const mongoose = require('mongoose');
require('../models/objeto');
const model = mongoose.model('objetosSchema');

	var api = {};
	
	api.adiciona = function(req,res){
	    model.create(req.body)
	    .then(function(objeto){
	      console.log('Objeto cadastrado')
	      res.json(objeto);
	    },function(error){
	      console.log(error);
	      res.sendStatus(500);
	    });
  	};

	// ############# TAGs ################
	api.identificaTag = function(req, res){

	};
	api.buscaPorTag = function(req, res){

	};
	api.atualizaTag = function (req, res){

	};
	api.editaTag = function (req, res){

	};
	api.buscaPorTag = function(req, res){
		model.findById(req.params.tag)
    	.then(function(objeto){
      	if(!usuario)throw new Error('Objeto não encontrado');
     		 res.json(usuario);
   		 });
	};

	// ############# IDs ##############
	api.identificaId = function(req, res){

	};

	api.atualizaId = function (req, res){

	};

	api.editaId = function (req, res){

	};

	api.buscaPorId = function(req, res){
		model.findById(req.params.id)
    	.then(function(objeto){
      	if(!usuario)throw new Error('Objeto não encontrado');
     		 res.json(usuario);
   		 });
	};

	

	module.exports = api;
