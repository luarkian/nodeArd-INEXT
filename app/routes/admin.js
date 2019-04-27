const express = require('express');
const router = express.Router();
const app = express();
const api = require('./../api/admin');
const mongoose = require('mongoose');

require('./../models/admin');
const modelAdmin = mongoose.model('adminSchema');

router.get('/admin/',api.lista)

router.post('/admin_dados', api.criar)

router.get('/admin_edit/:id', api.buscarPorId)

router.post('/editarAdm/:id',api.atualizaDados)

router.get('/removeAdm/:id',api.removePorId)

module.exports = router;