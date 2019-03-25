const mongoose = require('mongoose');
require('./../models/objeto');
const model = mongoose.model('objetosSchema');

	var api = {};
	
	api.lista = function(req,res){
	
		model.find()
			.then(function(objetos){
				res.json(objetos);

			}, function(error){
				console.log(error);
				res.status(500).json(error);
			});
	};
	api.adiciona = function(req,res){
		var body = req.body;
	    model.create(body)
	    .then(function(objeto){
	      console.log('Objeto cadastrado '+body.nome)
	      res.json(objeto);
	    },function(error){
	     // console.log(error);
	      res.sendStatus(500);
	    });
	    res.redirect('/');
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
		model.findOne(req.params.tag)
    	.then(function(objeto){
      	if(!objeto)throw new Error('Objeto não encontrado');
     		 res.json(objeto);
   		 });
	};
	api.verificar = function(req, res){
		model.findOne(req.params.tag).then(function(objeto){
      	if(!objeto){ //Objeto não encontrado
     		 var body = {'nome': 'Desconhecido',
     		 			  'tagRFID':req.params.tag,
     		 			  'descricao':'Desconhecido',
     		 			  'tombo': null,
     		 			  'sala':req.params.sala
     					}
     		model.create(body);
     		res.json(body);
     	}else if(objeto.sala == req.params.sala){
     		 objeto.sala = 'Sem sala ou em trasinção';
     		 model.findOneAndUpdate(objeto);
     		 res.json(objeto);
     		}
     	
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
      	if(!objeto)throw new Error('Objeto não encontrado');
     		 res.json(objeto);
   		 });
	};

	

	module.exports = api;
