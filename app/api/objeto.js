const mongoose = require('mongoose');
require('./../models/objeto');
const model = mongoose.model('objetosSchema');
const express = require('express');
const app = express();
const http = require('http').Server(app);	
const io = require('socket.io')(http);
var api = {};	
	
	io.on('connection', (socket)=>{
		model.find()
			.then(function(objeto){
				io.emit('objetos' ,objeto);
			}, function(error){
				console.log(error);
			});
	});
	
	
	api.lista = function(req,res){
	
		model.find()
			.then(function(objeto){
				res.json(objeto);

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

	api.buscaPorTag = function(req, res){
		model.findOne(req.params.tag)
    	.then(function(objeto){
      	if(!objeto)throw new Error('Objeto não encontrado');
     		 res.json(objeto);
   		 });
	};
	api.verificar = function(req, res){
		var bory = req.body;

		model.findOne({tagRFID:req.body.tagRFID}, (err, obj) =>{
			console.log(obj);
			if(obj == null){
				obj = {
					nome: 'Desconhecido',
					tagRFID:req.body.tagRFID,
					sala: req.body.sala,
					descricao: 'Desconhecido',
					tombo: 0
				}
				model.create(obj);	
			}
			else if(obj.sala == bory.sala){
				obj.sala = 'tansicao';
				model.findByIdAndUpdate({_id:obj.id}, {sala: obj.sala}, {new:true}).catch((err)=>{
					console.log(err);
				});
				console.log(" #1 ");
			}
			else if(obj.sala != bory.sala){
				obj.sala = bory.sala;
				model.findByIdAndUpdate({_id:obj.id}, {sala: obj.sala}, {new:true}).catch((err)=>{
					console.log(err);
				});
				console.log(" #2");
			}

		});
		/*
		model.findOne(req.params.tag).then(function(objeto){
      	if(!objeto){ //Objeto não encontrado
     		 var body = {'nome': 'Desconhecido',
     		 			  'tagRFID':req.params.tagRFID,
     		 			  'descricao':'Desconhecido',
     		 			  'tombo': null,
     		 			  'sala':req.params.sala
     					};
     		model.create(body);
     		res.json(body);
     	}else if(objeto.sala == req.params.sala){
     		 objeto.sala = 'Sem sala ou em trasinção';
     		 model.findOneAndUpdate(objeto.id ,objeto);
     		 res.json(objeto);
     		}
     	
   		 }); */
   		 res.send("ok");
	};
	api.atualizar = function(req ,res){
		model.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
	    .then( (obj)=>{
	      console.log(obj.id, req.body);
	      //res.json(obj);
	      res.redirect('/');
	    }).catch( (error)=>{
	      console.log(error);
	      ressendStatus(500);
	    });
		
	}

	// ############# IDs ##############

	api.buscaId = function (req, res){
		model.findById(req.params.id, function(err, obj){
				res.render('editar2',{ objeto: obj});	
		});

  };

	api.buscaPorId = function(req, res){
		model.findById(req.params.id)
    	.then(function(objeto){
      	if(!objeto)throw new Error('Objeto não encontrado');
     		 res.json(objeto);
   		 });
	};

	api.removePorId = function(req,res){
		model.remove({'_id':req.params.id})
	    .then(function(){
	      
	      res.redirect('/');
	    },function(error){
	      console.log(error);
	      res.sendStatus(500);
   		res.redirect('/');
   		 });
		
	};

	module.exports = api;
