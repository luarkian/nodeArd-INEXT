const mongoose = require('mongoose');
require('./../models/objeto');
const model = mongoose.model('objetosSchema');
const express = require('express');
const app = express();
const http = require('http').Server(app);	
const io = require('socket.io')(http);
var api = {};	
	
	
		
	/*	io.emit('objetos' ,(obj)=>{
			model.find()
				.then(function(objeto){
					obj = objeto;
					res.json(obj);
					})
				});
	*/
	
	
	api.lista = function(req,res){
		/*model.watch().on("change", objetos =>{
			io.emit("objetos",objetos=>{
				objetos = 'TESTE';
			});
		});*/
		model.find()
			.then(function(objeto){
				res.json(objeto);
				//io.emit('objetos' ,(obj)=>{
				//	obj = objeto;
				//});
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
			//console.log(obj);
			if(obj == null){
				obj = {
					nome: 'Desconhecido',
					tagRFID:req.body.tagRFID,
					sala: req.body.sala,
					descricao: 'Desconhecido',
					tombo: 0,
					restrincao:'',
					alerta:false
				}
				model.create(obj);	
			}
			else if(obj.sala == bory.sala){
				obj.sala = 'Em Tansição';
				if(obj.restrincao != ''){
					if(obj.restrincao != obj.sala){
						obj.alerta = 1;
					}
					else if(obj.restrincao == obj.sala){
						obj.alerta = 0;
					}
				}
				model.findByIdAndUpdate({_id:obj.id}, {sala: obj.sala, restrincao: obj.restrincao}, {new:true}).catch((err)=>{
					console.log(err);
				});
				console.log(" #1 ");
			}
			else if(obj.sala != bory.sala){
				obj.sala = bory.sala;
				if(obj.restrincao != ''){
					if(obj.restrincao != obj.sala){
						obj.alerta = 1;
					}
					else if(obj.restrincao == obj.sala){
						obj.alerta = 0;
					}
				}
				model.findByIdAndUpdate({_id:obj.id}, {sala: obj.sala, restrincao: obj.restrincao}, {new:true}).catch((err)=>{
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
		obj = {};
		model.findById(req.params.id, function(err, ob){
			obj = ob;
			
		});
		
		if(req.body.restrincao != ''){

			if(req.body.restrincao != req.body.sala){
				req.body.alerta = 1;
				model.findByIdAndUpdate({_id: req.params.id}, {alerta:1}, {new: true});
			}
			else if(req.body.restrincao == req.body.sala){
				req.body.alerta = 0;
				model.findByIdAndUpdate({_id: req.params.id}, {alerta:0}, {new: true});
			}
		}
		else if(req.body.restrincao == ''){
			req.body.alerta = 0;
			model.findByIdAndUpdate({_id: req.params.id}, {alerta:0}, {new: true});
		}
		model.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
	    .then( (obj)=>{
	      //console.log(obj.id, req.body);
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
