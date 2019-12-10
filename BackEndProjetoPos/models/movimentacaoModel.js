var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movimentacaoModel = new Schema({
    etapa: String,
    idmedicacao: String,
    datacadastro: { type: Date },
    usuariocadastro: String
});

module.exports = mongoose.model('Movimentacao', movimentacaoModel);
