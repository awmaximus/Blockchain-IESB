var movimentacaoController = function (Movimentacao) {
    var get = function (req, res) {
        Movimentacao.find(function (err, movimentacao) {
            if (err) {
                res.status(500);
                res.send('Erro interno do servidor');
            } else {
                res.status(200);
                res.send(movimentacao);
            }
        });
    };

    var add = function (req, res) {
        var movimentacao = new Movimentacao(req.body);
        movimentacao.datacadastro = Date.now();

        movimentacao.save(function (err) {
            if (err) {
                res.status(500);
                res.send('Erro : falha ao incluir o movimentacao do medicamento...');
            } else {
                res.status(201);
                res.send(movimentacao);
            }
        });
    };

    var getByIdMedicamento = function (req, res) {
        Movimentacao.find({ "idmedicacao": req.params.idmedicamento }, function (err, movimentacao) {
            if (err) {
                res.status(404);
                res.send('Movimentação do medicamento não encontrado...');
            } else {
                res.status(200);
                res.send(movimentacao);
            }
        });
    };

    return {
        add: add,
        get: get,
        getByIdMedicamento: getByIdMedicamento
    };
};

module.exports = movimentacaoController;
