//main.js
var urlservicemedicamento = urlservice + 'medicamento';
var urlservicemovimentacao = urlservice + 'movimentacao';

angular.module('app').controller('administrativoCtrl', administrativoCtrl);
//convert Hex to RGBA
function convertHex(hex, opacity) {
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
}

administrativoCtrl.$inject = ['$scope', '$http'];
function administrativoCtrl($scope, $http) {
    $scope.ItemSelecionado = undefined;

    $scope.msgAlerta = false;
    $scope.msgSucesso = false;
    $scope.textoMsg = "";


    $scope.NovoItem = false;
    $scope.EditItem = false;
    $scope.MovimentacaoItem = false;
    $scope.ListaItem = false;
    $scope.EtapaMovimentacao = "";

    $scope.UsuarioCadastro = 'Colaborador';
    $scope.MovimentacaoItemIncluir = false;
    $scope.ResultadoDetalheMovimentacao = [];
    $scope.Nome = undefined;
    $scope.Fabricante = undefined;
    $scope.RegistroAnvisa = undefined;
    $scope.Lote = undefined;
    $scope.Validade = undefined;
    $scope.Tipo = 0;
    $scope.CodigoBarras = undefined;
    $scope.Ativo = true;

    $scope.Dataset = [
        'Produto',
        'Fabricante',
        'Registro Anvisa',
        'Lote',
        'Validade',
        'Tipo',
        'Código de Barras',
        'Ativo',
        'Operação'
    ];

    function GetMedicamentos() {
        $http.get(urlservicemedicamento).then(function (response) {
            $scope.medicamentos = response.data;
        });
    }

    $scope.PostMedicamento = function () {
        var data = {
            nome: $scope.Nome,
            fabricante: $scope.Fabricante,
            registroanvisa: $scope.RegistroAnvisa,
            lote: $scope.Lote,
            validade: Date.parse($scope.Validade),
            tipo: $scope.Tipo,
            codigobarra: $scope.CodigoBarras,
            ativo: $scope.Ativo
        };

        if ($scope.ItemSelecionado == undefined) {
            $http.post(urlservicemedicamento, data).then(function (response) {
                $scope.ResultPost(response, 'O medicamento foi incluído.', 'Não foi possível salvar a medicação.');
                $scope.ItemSelecionado = undefined;
                $scope.Fluxo('listaritem');
            });
        } else {
            $http
                .put(urlservicemedicamento + "/" + $scope.ItemSelecionado._id, data)
                .then(function (response) {
                    $scope.ResultPost(response, 'Os dados foram alterados.', 'Não foi possível atualizar os dados da medicação');
                    $scope.ItemSelecionado = undefined;
                    $scope.Fluxo('listaritem');
                });
        }
    };

    $scope.ResultPost = function (response, textosucesso, textoerro) {
        if (response.status == 201 || response.status == 200) {
            $('#modalSucesso').modal('show');
            $scope.msgAlerta = false;
            $scope.msgSucesso = true;
            $scope.textoMsg = textosucesso;
        } else {
            $('#modalAlerta').modal('show');
            $scope.msgAlerta = true;
            $scope.msgSucesso = false;
            $scope.textoMsg = textoerro;
        }               
    };

    $scope.getIdMedicamento = function (item) {
        $scope.Id = item._id;
        $scope.Nome = item.nome;
        $scope.Fabricante = item.fabricante;
        $scope.RegistroAnvisa = item.registroanvisa;
        $scope.Lote = item.lote;
        $scope.Validade = new Date(Date.parse(item.validade));
        $scope.Tipo = item.tipo;
        $scope.CodigoBarras = item.codigobarra;
        $scope.Ativo = item.ativo;
    };

    $scope.Cancelar = function (item) {
        if (item != undefined && item == 'movimentacao') {
            $scope.EtapaMovimentacao = "";
            $scope.MovimentacaoItemIncluir = false;
        }
        else {
            $scope.ItemSelecionado = undefined;
            $scope.Fluxo("listaritem");
        }
    };

    $scope.Fluxo = function (fluxo, item) {
        $scope.ListaItem = false;
        $scope.NovoItem = false;
        $scope.EditItem = false;
        $scope.MovimentacaoItem = false;

        switch (fluxo) {
            case "listaritem":
                $scope.ListaItem = true;
                GetMedicamentos();
                break;
            case "novoitem":
                $scope.NovoItem = true;
                $scope.Iniciar();
                break;
            case "editaritem":
                $scope.ItemSelecionado = item;
                $scope.getIdMedicamento(item);
                $scope.EditItem = true;
                break;
            case "movimentacao":
                $scope.ItemSelecionado = item;
                $scope.DetalheMovimentacao(item._id);
                $scope.MovimentacaoItem = true;
                break;
            default:
                break;
        }

    }

    $scope.DetalheMovimentacao = function (idmedicamento) {
        $http
            .get(urlservicemovimentacao + "/" + idmedicamento)
            .then(function (response) {
                $scope.ResultadoDetalheMovimentacao = response.data;
            });
    }

    $scope.MovimentacaoIncluir = function () {
        $scope.MovimentacaoItemIncluir = true;
    }

    $scope.PostMovimentacao = function () {
        var data = {
            etapa: $scope.EtapaMovimentacao,
            idmedicacao: $scope.ItemSelecionado._id,
            usuariocadastro: $scope.UsuarioCadastro
        };

        $http.post(urlservicemovimentacao, data).then(function (response) {
            $scope.ResultPost(response, 'A etapa foi cadastrada.', 'Não foi possível cadastrar a etapa da movimentação.' );
            $scope.ResultadoDetalheMovimentacao = response.data;
            $scope.MovimentacaoItemIncluir = false;
            $scope.DetalheMovimentacao($scope.ItemSelecionado._id);
        });
    };

    $scope.VoltarMedicamentos = function () {
        $scope.Fluxo('listaritem');
    }

    $scope.Iniciar = function () {
        $scope.ItemSelecionado = undefined;

        $scope.msgAlerta = false;
        $scope.msgSucesso = false;

        $scope.Nome = undefined;
        $scope.Fabricante = undefined;
        $scope.RegistroAnvisa = undefined;
        $scope.Lote = undefined;
        $scope.Validade = undefined;
        $scope.Tipo = 0;
        $scope.CodigoBarras = undefined;
        $scope.Ativo = true;
    };

    $scope.Fluxo("listaritem");
}
