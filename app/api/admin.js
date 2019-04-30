const mongoose = require('mongoose');
require('./../models/admin');
const fs = require('fs');
const model = mongoose.model('adminSchema');	
const moment = require('moment');
var api = {};	

api.lista = function(req, res){	
	model.find(null, function(err,adm){
		
		if(err){
			throw err;
		}
		res.render('admin', {title:'adms', admin: adm});
		});	
};
api.criar = function(req, res){	
	var body = req.body;
	    
	model.findOne({email:body.email}, (err,user)=>{
		console.log(user)
		if(user == null){
			model.create(body);
			var date = moment().format('YYYY-MM-DD');
			fs.writeFile('./../nodeArd1-INEXT/logs/'+date+'.txt','User create: nome: '+body.nome+', email: '+body.email+' time: '+moment().format('HH:mm')+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
			    
			    console.log('Arquivo salvo!'+date);
			});
	    	res.redirect('/admin');	
		}
		else{
			model.find(null, function(err,adm){
				res.render('admin', {title:'adms1', exist:1, admin:adm });
			});
			
		}
	});
	    
};

api.buscarPorId= function(req,res){

	model.findById(req.params.id, function(err, adm){
				res.render('editaradm',{ admin: adm});	
		});
};

api.atualizaDados = function (req, res ){
	var body = req.body;
	model.findByIdAndUpdate(req.params.id, {nome:req.body.nome, email: req.body.email}, {new:true}).then(()=>{
		var date = moment().format('YYYY-MM-DD');
		fs.writeFile('./../nodeArd1-INEXT/logs/'+date+'.txt','User: id: '+req.params.id+', change to: nome: '+body.nome+', email: '+body.email+' time: '+moment().format('HH:mm')+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
			    
			console.log('Arquivo salvo!'+date);
		});	
	}).catch((err)=>{
		
		console.log(err);
	});
	res.redirect('/admin');
};
api.removePorId = function(req,res){
	model.remove({'_id':req.params.id})
	    .then(function(){
	      var date = moment().format('YYYY-MM-DD');
		  fs.writeFile('./../nodeArd1-INEXT/logs/'+date+'.txt','User: id: '+req.params.id+' removido'+' time: '+moment().format('HH:mm')+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
			    
			console.log('Arquivo salvo!'+date);
		});	
	      res.redirect('/admin');
	    },function(error){
	      console.log(error);
	      res.sendStatus(500);
   		res.redirect('/admin');
   		 });
};

api.sendEmail = function (req, res ){

};

module.exports = api;
