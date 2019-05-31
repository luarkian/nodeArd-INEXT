const mongoose = require('mongoose');
require('./../models/objeto');
require('./../models/admin');
require('./../models/sala');
const model = mongoose.model('objetosSchema');
const modelAdm = mongoose.model('adminSchema');
const modelSala = mongoose.model('salaSchema');
const express = require('express');
const app = express();
const http = require('http').Server(app);	
const io = require('socket.io')(http);
const fs = require('fs');
const moment = require('moment');
const nodemailer = require('nodemailer');
var api = {};	
	
var transporter = nodemailer.createTransport({
  service: 'Zoho',
        auth: {
            user: 'cruiserweights@zoho.com', // Your email address
            pass: 'PAssword123!@#' // Your password
        }
});


api.lista = function(req,res){
	/*model.watch().on("change", objetos =>{
		io.emit("objetos",objetos=>{
			objetos = 'TESTE';
		});
	});*/
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
	modelSala.findOne({nome:body.sala}, (sala)=>{
		if(sala == null){
			var nome_sala = {nome:req.body.sala}
			modelSala.create(nome_sala);
		}
	});
    model.create(body)
    .then(function(obj){
      console.log('Objeto cadastrado '+body.nome);
      fs.writeFile('./../nodeArd1-INEXT/logs/'+date+'.txt','Objeto criado, tagRFID: '+obj.tagRFID+' nome: '+obj.nome+' time:'+moment().format('HH:mm')+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
		    console.log('Arquivo salvo!'+date);
		});
      res.json(obj);
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
api.ver = function(req, res){
	var body = req.body;
	console.log(body);
	res.send("ok1");
};

api.verificar = function(req, res){
	var bory = req.body;
	modelSala.findOne({nome:body.sala}, (sala)=>{
		if(sala == null){
			var nome_sala = {nome:req.body.sala}
			modelSala.create(nome_sala);
		}
	});
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
			var date = moment().format('YYYY-MM-DD');
			fs.writeFile('./../nodeArd1-INEXT/logs/'+date+'.txt','Objeto criado, tagRFID: '+obj.tagRFID+' time:'+moment().format('HH:mm')+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
			    console.log('Arquivo salvo!'+date);
			});
			model.create(obj);	
		}
		else if(obj.sala == bory.sala){
			obj.sala = 'Em Tansição';
			if(obj.restrincao != ''){
				if(obj.restrincao != obj.sala){
					obj.alerta = 1;
					// Enviar email
					var mailOptions = {};
					var emails = ' ';
					modelAdm.find().then(obj =>{
						for(var i=0; i <  obj.length; i++){
							if(i == obj.length-1)
								emails += obj[i].email+' ';
							
							else{
								emails += obj[i].email+', ';
							}
						}
						mailOptions = {
							from: 'cruiserweights@zoho.com',
							to: [emails],
							subject: 'Violação de restrincao - INEXT',
							text:'O objeto de tag: '+bory.tagRFID+' violou sua restrinção.'
						};

						transporter.sendMail(mailOptions, function(error, info){
						  if (error) {
						    console.log(error);
						  } else {
						    console.log('Email sent: ' + info.response);
						  }
						}); 	
					});	
						
				}
				else if(obj.restrincao == obj.sala){
					obj.alerta = 0;
				}
			}
			model.findByIdAndUpdate({_id:obj.id}, {sala: obj.sala, restrincao: obj.restrincao, alerta: obj.alerta}, {new:true}).catch((err)=>{
				console.log(err);
			});
			var date = moment().format('YYYY-MM-DD');
			fs.writeFile('./../nodeArd1-INEXT/logs/'+date+'.txt','Objeto TagRFID: '+obj.tagRFID+' id: '+obj.id+' saiu da sala: '+bory.sala+' time: '+moment().format('HH:mm')+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
				console.log('Arquivo salvo!'+date);
			});
		}
		else if(obj.sala != bory.sala){
			obj.sala = bory.sala;
			if(obj.restrincao != ''){
				if(obj.restrincao != obj.sala){
					obj.alerta = 1;
					// Enviar email
					var mailOptions = {};
					var emails = ' ';
					modelAdm.find().then(obj =>{
						for(var i=0; i <  obj.length; i++){
							if(i == obj.length-1)
								emails += obj[i].email+' ';
							
							else{
								emails += obj[i].email+', ';
							}
						}
						mailOptions = {
							from: 'cruiserweights@zoho.com',
							to: [emails],
							subject: 'Violação de restrincao - INEXT',
							text:'O objeto de tag: '+bory.tagRFID+' violou sua restrinção.',
							html:'<strong>O objeto a seguir violou sua restrinção: </strong><br> Nome: '+body.nome+'<br>Tag RFID: '+body.tagRFID+'<br>Descrição: '+body.descricao+'<br>Tombo: '+tombo+'<br>Localização(Sala): '+body.sala+'<br> Restrinção: '+body.restrincao
						};

						transporter.sendMail(mailOptions, function(error, info){
						  if (error) {
						    console.log(error);
						  } else {
						    console.log('Email sent: ' + info.response);
						  }
						}); 	
					});	
				}
				else if(obj.restrincao == obj.sala){
					obj.alerta = 0;
				}
			}
			model.findByIdAndUpdate({_id:obj.id}, {sala: obj.sala, restrincao: obj.restrincao, alerta: obj.alerta}, {new:true}).catch((err)=>{
				console.log(err);
			});
			var date = moment().format('YYYY-MM-DD');
			fs.writeFile('./../nodeArd1-INEXT/logs/'+date+'.txt','Objeto TagRFID: '+obj.tagRFID+' id: '+obj.id+' entrou na sala: '+bory.sala+' time: '+moment().format('HH:mm')+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
				console.log('Arquivo salvo!'+date);
			});
		}

	});

		 res.send("ok");
};
api.atualizar = function(req ,res){
	obj = {};
	model.findById(req.params.id, function(err, ob){
		obj = ob;
		
	});
	modelSala.findOne({nome:req.body.sala}, (sala)=>{
		if(sala == null){
			var nome_sala = {nome:req.body.sala}
			modelSala.create(nome_sala);
		}
	});
	if(req.body.restrincao != ''){

		if(req.body.restrincao != req.body.sala){
			req.body.alerta = 1;
			// Enviar email
			var mailOptions = {};
					var emails = ' ';
					modelAdm.find().then(obj =>{
						for(var i=0; i <  obj.length; i++){
							if(i == obj.length-1)
								emails += obj[i].email+' ';
							
							else{
								emails += obj[i].email+', ';
							}
						}
						mailOptions = {
							from: 'cruiserweights@zoho.com',
							to: [emails],
							subject: 'Violação de restrincao - INEXT',
							text:'O objeto de tag: '+req.body.tagRFID+' violou sua restrinção.',
							html:'<strong>O objeto a seguir violou sua restrinção: </strong><br> Nome: '+req.body.nome+'<br>Tag RFID: '+req.body.tagRFID+'<br>Descrição: '+req.body.descricao+'<br>Tombo: '+req.body.tombo+'<br>Localização(Sala): '+req.body.sala+'<br> Restrinção: '+req.body.restrincao
						};

						transporter.sendMail(mailOptions, function(error, info){
						  if (error) {
						    console.log(error);
						  } else {
						    console.log('Email sent: ' + info.response);
						  }
						}); 	
					});	
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
	model.findById(req.params.id)
		.then(function(objeto){
		
		var date = moment().format('YYYY-MM-DD');
		fs.writeFile('./../nodeArd1-INEXT/logs/'+date+'.txt','Objeto TagRFID: '+req.body.tagRFID+', id: '+req.params.id+', nome: '+objeto.nome+', descrição: '+objeto.descrição+', tombo: '+objeto.tombo+', localização (sala): '+objeto.sala+', restrinção: '+objeto.restrincao+', foi modificado para: [nome, tagRFID, descrição, tombo, localização(sala), restrinção]['+req.body.nome+','+req.body.tagRFID+','+req.body.descricao+','+req.body.tombo+','+req.body.sala+','+req.body.restrincao+'], time: '+moment().format('HH:mm')+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
			console.log('Arquivo salvo!');
		});
	});
	var date = moment().format('YYYY-MM-DD');
	var body = req.body;
	console.log(date);
	body.alteracao = date;	
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
      fs.writeFile('./../nodeArd1-INEXT/logs/'+date+'.txt','Objeto id: '+req.params.id+' foi excluido, time: '+moment().format('HH:mm')+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
		console.log('Arquivo salvo!');
		});
      res.redirect('/');
    },function(error){
      console.log(error);
      res.sendStatus(500);
		res.redirect('/');
		 });
	
};
api.inventario =function(req, res){
	/*modelSala.find().then(salas =>{
		model.find().then( obj =>{
			res.render('inventario',{title: 'Salas', sala: salas, objeto: obj});
		});	
	});*/

Promise.all([modelSala.find(),model.find()])
	.then( ([ salas, obj ]) => {
  		//console.log(salas,obj);
  		res.render('inventario',{title: 'Salas', sala:salas,objeto:obj});
	});
	
};

module.exports = api;
