var express = require('express');
var Medicamento = require('../models/medicamentoModel');
var medicamentoController = require('../controllers/medicamentoController')(Medicamento);
var medicamentoRouter = express.Router();

medicamentoRouter.route('')
  .get(medicamentoController.get)
  .post(medicamentoController.add);

medicamentoRouter.route('/:id')
  .get(medicamentoController.getById)
  .put(medicamentoController.update)
  .delete(medicamentoController.del);

module.exports = medicamentoRouter;
