var express = require('express');
var medicamentoRouter = require('./routes/medicamentoRouter');
var movimentacaoRouter = require('./routes/movimentacaoRouter');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017/medicamentodb';
var db = mongoose.connect(url);

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
app.listen(8081, function() {
  console.log('Servidor conectado na porta 8081');
});

app.use('/medicamento', medicamentoRouter);
app.use('/movimentacao', movimentacaoRouter);
