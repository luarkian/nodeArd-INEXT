const mongoose = require('mongoose');
require('./../models/sala');
const fs = require('fs');
const model = mongoose.model('salaSchema');	
const moment = require('moment');
var api = {};

api.listar = function(req, res){
	model.find().then(salas =>{
		res.render('salas',{title: 'Salas', sala: salas});	
	});
};

api.excluir = function (req, res){
	model.remove({'_id':req.params.id})
    .then(function(){
 //     fs.writeFile('./../nodeArd1-INEXT/logs/'+date+'.txt','Sala id: '+req.params.id+' foi excluido, time: '+moment().format('HH:mm')+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
//		console.log('Arquivo salvo!');
//		});
      res.redirect('/');
    },function(error){
      console.log(error);
      res.sendStatus(500);
		res.redirect('/');
		 });
};


module.exports = api;