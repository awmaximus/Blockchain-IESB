var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var medicamentoModel = new Schema({
  nome: String,
  fabricante: String,
  registroanvisa: Number,
  lote: String,
  validade: { type: Date },
  datacadastro: { type: Date },
  tipo: Number,
  codigobarra: String,
  usuariocadastro: String,
  ativo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Medicamento', medicamentoModel);
