const express = require('express');
const router = express.Router();
const app = express();
const api = require('./../api/objeto');
const mongoose = require('mongoose');

require('./../models/objeto');
const objeto = mongoose.model('objetosSchema');

//app.get('/');

router.get('/',function (req , res){
	res.sendFile('index.html');
})
router.post('/cadastrar', api.adiciona)

router.get('/objetos', api.lista)

router.post('/verificacao',api.verificar)

//router('/nodeArd/rfid/:tag', api.identificaTag)
//.get(api.buscaPorTag)
//.delete(api.removerPorTag)
//.put(api.atualizaTag);

//router('/nodeArd/objeto/:id', api.identificaId)
//.get(api.buscaPorId)
//.delete(api.removerPorId)
//.put(api.atualizaId);

module.exports = router;
