const express = require('express');
const router = express.Router();
const app = express();
const api = require('./../api/objeto');
const mongoose = require('mongoose');

require('./../models/objeto');
const modelObjeto = mongoose.model('objetosSchema');
//app.get('/');

router.get('/',function (req , res){
	modelObjeto.find(null, function(err,objetos){
			//res.json(objeto);
			if(err){
				throw err;
			}
			
			res.render('index', {title:'Express', objeto: objetos});
			});
	
})
router.get('/cadastra',function(req, res){
	res.render('cadastra')
})
router.post('/cadastrar', api.adiciona)

router.get('/objetos', api.lista)

router.post('/verificacao',api.verificar)

router.get('/editar/:id',api.buscaId)

router.post('/editar/:id', api.atualizar)

router.get('/remove/:id',api.removePorId)

//router('/nodeArd/rfid/:tag', api.identificaTag)
//.get(api.buscaPorTag)
//.delete(api.removerPorTag)
//.put(api.atualizaTag);

//router('/nodeArd/objeto/:id', api.identificaId)
//.get(api.buscaPorId)
//.delete(api.removerPorId)
//.put(api.atualizaId);

module.exports = router;
