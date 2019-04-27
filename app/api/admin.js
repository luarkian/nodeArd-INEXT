const mongoose = require('mongoose');
require('./../models/admin');
const model = mongoose.model('adminSchema');	
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
	    model.create(body);
	    res.redirect('/admin');
};

api.buscarPorId= function(req,res){

	model.findById(req.params.id, function(err, adm){
				res.render('editaradm',{ admin: adm});	
		});
};

api.atualizaDados = function (req, res ){
	var body = req.body;
	model.findByIdAndUpdate(req.params.id, {nome:req.body.nome, email: req.body.email}, {new:true}).catch((err)=>{
		console.log(err);
	});
	res.redirect('/admin');
};
api.removePorId = function(req,res){
	model.remove({'_id':req.params.id})
	    .then(function(){
	      
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
