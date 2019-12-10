var express = require('express');
var MongoClient = require('mongodb').MongoClient;
// conexao com o banco de dados
MongoClient.connect('mongodb://localhost:27017/vendasdb', function(err, client) {
  var db = client.db('Pessoas');

  db.collection('Pessoas', function(err, collection) {
    collection.insert({ nome: 'Macoratti', email: 'macoratti@yahoo.com' });
    collection.insert({ nome: 'Miriam', email: 'miriam@hotmail.com' });
    collection.insert({ nome: 'Jefferson', email: 'jeff@bol.com.br' });
    db.collection('Pessoas').count(function(err, count) {
      if (err) throw err;
      console.log('Total Linhas na coleção : ' + count);
    });
  });
});
