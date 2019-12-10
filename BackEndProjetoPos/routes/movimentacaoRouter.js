var express = require('express');
var Movimentacao = require('../models/movimentacaoModel');
var movimentacaoController = require('../controllers/movimentacaoController')(Movimentacao);
var movimentacaoRouter = express.Router();

movimentacaoRouter.route('')
    .get(movimentacaoController.get)
    .post(movimentacaoController.add);

movimentacaoRouter.route('/:idmedicamento')
    .get(movimentacaoController.getByIdMedicamento)

module.exports = movimentacaoRouter;
