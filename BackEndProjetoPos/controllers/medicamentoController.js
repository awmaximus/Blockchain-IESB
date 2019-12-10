var medicamentoController = function(Medicamento) {
  var get = function(req, res) {
    Medicamento.find(function(err, medicamentos) {
      if (err) {
        res.status(500);
        res.send('Erro interno do servidor');
      } else {
        res.status(200);
        res.send(medicamentos);
      }
    });
  };

  var add = function(req, res) {
    var medicamento = new Medicamento(req.body);

    medicamento.save(function(err) {
      if (err) {
        res.status(500);
        res.send('Erro : falha ao incluir o medicamento...');
      } else {
        res.status(201);
        res.send(medicamento);
      }
    });
  };

  var getById = function(req, res) {
    Medicamento.findById(req.params.id, function(err, medicamento) {
      if (err) {
        res.status(404);
        res.send('Medicamento não encontrado...');
      } else {
        res.status(200);
        res.send(medicamento);
      }
    });
  };

  var update = function(req, res) {
    Medicamento.findById(req.params.id, function(err, medicamento) {
      if (err) {
        res.status(404);
        res.send('Medicamento não encontrado...');
      } else {
        medicamento.nome = req.body.nome;
        medicamento.fabricante = req.body.fabricante;
        medicamento.registroanvisa = req.body.registroanvisa;
        medicamento.lote = req.body.lote;
        medicamento.validade = req.body.validade;
        medicamento.datacadastro = req.body.datacadastro;
        medicamento.tipo = req.body.tipo;
        medicamento.codigobarra = req.body.codigobarra;
        medicamento.usuariocadastro = req.body.usuariocadastro;
        medicamento.ativo = req.body.ativo;

        medicamento.save(function(err) {
          if (!err) {
            res.status(200);
            res.send(medicamento);
          } else {
            res.status(500);
            res.send('Erro ao atualizar o medicamento...');
          }
        });
      }
    });
  };

  var del = function(req, res) {
    Medicamento.findById(req.params.id, function(err, medicamento) {
      medicamento.remove(function(err) {
        if (!err) {
          res.status(204);
          res.send('Medicamento excluído...');
        }
      });
    });
  };

  return {
    add: add,
    get: get,
    getById: getById,
    update: update,
    del: del
  };
};

module.exports = medicamentoController;
