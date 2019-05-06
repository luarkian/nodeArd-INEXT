const express = require('express');
const router = express.Router();
const app = express();
const api = require('./../api/sala');
const mongoose = require('mongoose');

require('./../models/sala');
const modelSala = mongoose.model('salaSchema');

router.get('/sala/',api.listar)

router.get('/removeSala/:id',api.excluir)

module.exports = router;