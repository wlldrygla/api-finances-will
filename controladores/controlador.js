
const financasController = function (Financasbd, Usuarios, Metas) {
    const getAllFinances = function (req, res) {
        Financasbd.find({ usuario: req.params.usuario }).exec(function (err, financas) {
            var lista = [];
            for (let i = 0; i < financas.length; i++) {
                lista.push(financas[i])
            }
            res.status(200)
            res.json({
                financa: lista
            })
            console.log('requisition:', req.params.usuario )
        })
    };

    const addNewFinance = function (req, res) {
        console.log(req.body.periodo)
        var meses = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        if (req.body.periodo == "periodico") {
            let mesInicio = parseInt(req.body.mesInicio)
            let mesTermino = parseInt(req.body.mesTermino)
            for (i = mesInicio; i <= mesTermino; i++) {
                let lista = {
                    nome: req.body.nome,
                    valor: req.body.valor,
                    categoria: req.body.categoria,
                    situacao: req.body.situacao,
                    mes: meses[i],
                    subcategoria: req.body.subcategoria,
                    usuario: req.body.usuario
                }
                var financaTeste = new Financasbd(lista);
                financaTeste.save(function (err) {
                    if (err) {
                        res.status(500);
                        res.send('Erro : falha ao incluir produto...' + err);
                    }
                    else {
                        res.status(201);
                        console.log('cadastrado')
                    }
                })
            }
        } else if (req.body.periodo == "fixo") {
            for (i = 1; i <= 12; i++) {
                let lista = {
                    nome: req.body.nome,
                    valor: req.body.valor,
                    categoria: req.body.categoria,
                    situacao: req.body.situacao,
                    mes: meses[i],
                    subcategoria: req.body.subcategoria,
                    usuario: req.body.usuario
                }
                var financaTeste = new Financasbd(lista);
                financaTeste.save(function (err) {
                    if (err) {
                        res.status(500);
                        res.send('Erro : falha ao incluir produto...' + err);
                    }
                    else {
                        if (i > 12) {
                            res.status(201);



                        }
                    }
                })
            }
        } else {
            var financa = new Financasbd(req.body);
            console.log('teste1')

            financa.save(function (err) {
                if (err) {
                    res.status(500);
                    res.send('Erro : falha ao incluir produto...' + err);
                }
                else {

                    res.status(201);
                    res.send("ok" + financa);


                }
            })
        }



    };

    const categoryMonthTotal = function (req, res) {
        Financasbd.find({ usuario: req.params.usuario }).exec(function (err, financas) {
            var total_antigo = 0;
            var total_novo = 0;
            var total = 0;

            for (let i = 0; i < financas.length; i++) {

                if (financas[i].mes == req.params.mes && financas[i].categoria == req.params.categoria) {

                    total_novo = financas[i].valor;
                    total = total_antigo + total_novo;
                    total_antigo = total;


                }
            }
            res.status(200)
            res.json({
                Total: total
            })
        })

    };

    const subCategoryMonthTotal = function (req, res) {
        Financasbd.find({ usuario: req.params.usuario }).exec(function (err, financas) {
            var total_antigo = 0;
            var total_novo = 0;
            var total = 0;

            for (let i = 0; i < financas.length; i++) {

                if (financas[i].mes === req.params.mes && financas[i].categoria === req.params.categoria && financas[i].subcategoria === req.params.subcategoria) {

                    total_novo = financas[i].valor;
                    total = total_antigo + total_novo;
                    total_antigo = total;


                }
            }
            res.status(200)
            res.json({
                Total: total
            })
        })

    };

    const categoryTotal = function (req, res) {
        Financasbd.find({ usuario: req.params.usuario }).exec(function (err, financas) {
            var total_antigo = 0;
            var total_novo = 0;
            var total = 0;

            for (let i = 0; i < financas.length; i++) {

                if (financas[i].categoria == req.params.categoria) {

                    total_novo = financas[i].valor;
                    total = total_antigo + total_novo;
                    total_antigo = total;


                }
            }
            res.status(200)
            res.json({
                Total: total
            })
        })

    };

    const monthTotal = function (req, res) {
        Financasbd.find({ usuario: req.params.usuario }).exec(function (err, financas) {
            var total_antigo = 0;
            var total_novo = 0;
            var total = 0;

            for (let i = 0; i < financas.length; i++) {

                if (financas[i].mes == req.params.mes) {
                    if(financas[i].categoria === 'ganho'){
                        total_novo = financas[i].valor;
                        total = total_antigo + total_novo;
                        total_antigo = total;
                    }else{
                        total_novo = financas[i].valor;
                        total = total_antigo - total_novo;
                        total_antigo = total;  
                    }
                }
            }
            res.status(200)
            res.json({
                Total: total
            })
        })

    };

    const getFinanceById = function (req, res) {
        Financasbd.findById(req.params.id, function (err, financas) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(200);
                res.send(financas);
            }
        })
    };

    const updateFinance = function (req, res) {
        console.log('ITEM',req.body.item)
        console.log('body',req.body)

        Financasbd.findByIdAndUpdate(req.params.id, req.body.item, function (err, Financas) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(200);
                res.send("Atualizado");
            }
        });
    };

    const mudarParaFinalizado = function (req, res) {
        Financasbd.findByIdAndUpdate(req.params.id, { situacao: 'finalizado' }, function (err, Financas) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(200);
            }
        });
    };

    const mudarParaPendente = function (req, res) {
        Financasbd.findByIdAndUpdate(req.params.id, { situacao: 'pendente' }, function (err, Financas) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(200);
                res.send("Atualizado");
            }
        });
    };

    const deleteFinance = function (req, res) {
        Financasbd.findById(req.params.id, function (err, financas) {
            financas.remove(function (err) {
                if (!err) {
                    res.status(204);
                }
            });
        });
    };

    const userLogin = function (req, res) {
        Usuarios.find({ usuario: req.body.usuario }).exec(function (err, usuario) {

            if (err) {
                console.log('erro:', err)
                res.send('erro')
            } else if (usuario.length == 0) {
                res.json({ erro: "Usuario Incorreto" })
            }

            else {
                for (let i = 0; i < usuario.length; i++) {
                    if (usuario[i].senha == req.body.senha) {
                        res.json({ usuarioLogado: usuario[i].usuario })
                    } else {
                        res.json({ erro: "Senha Incorreta" })
                    }
                }
            }


        })
    };

    const getMetas = function (req, res) {
        Metas.find({ usuario: req.params.usuario }).exec(function (err, metas) {
            var lista = [];
            for (let i = 0; i < metas.length; i++) {
                lista.push(metas[i])
            }
            res.status(200)
            res.json({
                metas: lista
            })
        })
    };

    const addMetas = function (req, res) {
        let lista = {
            name: req.body.meta,
            status: req.body.status,
            usuario: req.body.usuario

        }

        var metasBd = new Metas(lista);
        metasBd.save(function (err) {
            if (err) {
                res.status(500);
                res.send('Erro : falha ao incluir produto...' + err);
            }
            else {
                res.status(201);
                res.send(lista.name)
            };
        });
    };

    const changeTaskToDoing = function (req, res) {
        Metas.findByIdAndUpdate(req.params.id, { status: 'FAZENDO' }, function (err, Financas) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(201);
            }
        });
    };

    const changeTaskToDone = function (req, res) {
        Metas.findByIdAndUpdate(req.params.id, { status: 'FINALIZADO' }, function (err, Financas) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(201);
            }
        });
    };

    const changeTaskToDo = function (req, res) {
        Metas.findByIdAndUpdate(req.params.id, { status: 'PENDENTE' }, function (err, Financas) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(201);                
            }
        });
    };

    return {
        addNewFinance: addNewFinance,
        getAllFinances: getAllFinances,
        getFinanceById: getFinanceById,
        updateFinance: updateFinance,
        deleteFinance: deleteFinance,
        categoryMonthTotal: categoryMonthTotal,
        categoryTotal:categoryTotal,
        userLogin: userLogin,
        mudarParaFinalizado: mudarParaFinalizado,
        mudarParaPendente: mudarParaPendente,
        getMetas: getMetas,
        addMetas: addMetas,
        changeTaskToDoing: changeTaskToDoing,
        changeTaskToDone: changeTaskToDone,
        changeTaskToDo: changeTaskToDo,
        monthTotal: monthTotal,
        subCategoryMonthTotal: subCategoryMonthTotal,
    }
};
module.exports = financasController;