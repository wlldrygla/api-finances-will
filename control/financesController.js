
const financesController = function (Finances) {
    const getAllFinances = function (req, res) {
        Finances.find({ user: req.params.user }).exec(function (err, finances) {
            let financeList = [];
            for (let i = 0; i < finances.length; i++) {
                financeList.push(finances[i])
            }
            res.status(200)
            res.json({
                finance: financeList
            })
        })
    };

    const addNewFinance = function (req, res) {
        let months = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        if (req.body.period == "periodic") {
            let startMonth = parseInt(req.body.startMonth)
            let endMonth = parseInt(req.body.endMonth)
            for (i = startMonth; i <= endMonth; i++) {
                let financeList = {
                    name: req.body.name,
                    value: req.body.value,
                    category: req.body.category,
                    situation: req.body.situation,
                    month: months[i],
                    subcategory: req.body.subcategory,
                    user: req.body.user
                }
                let finance = new Finances(financeList);

                finance.save(function (err) {
                    if (err) {
                        res.status(500);
                        res.send('Erro : falha ao incluir produto...' + err);
                    }
                    else {
                        res.status(200);
                        res.send(financeList.name)
                    }
                })
            }
        } else if (req.body.period == "fixed") {
            for (let i = 1; i <= 12; i++) {
                let financeList = {
                    name: req.body.name,
                    value: req.body.value,
                    category: req.body.category,
                    situation: req.body.situation,
                    month: months[i],
                    subcategory: req.body.subcategory,
                    user: req.body.user
                }
                let finance = new Finances(financeList);
                finance.save(function (err) {
                    if (err) {
                        res.status(500);
                        res.send('Erro : falha ao incluir produto...' + err);
                    }
                    else {
                        if (i > 12) {
                            res.status(200);
                            res.send(financeList.name)
                        }
                    }
                })
            }
        } else {
            let finance = new Finances(req.body);

            finance.save(function (err) {
                if (err) {
                    res.status(500);
                    res.send('Erro : falha ao incluir produto...' + err);
                }
                else {
                    res.status(200);
                    res.send(req.body.name)
                }
            })
        }
    };

    const categoryMonthTotal = function (req, res) {
        Finances.find({ user: req.params.user }).exec(function (err, finances) {
            let oldTotal = 0;
            let newTotal = 0;
            let total = 0;

            for (let i = 0; i < finances.length; i++) {
                if (finances[i].month == req.params.month && finances[i].category == req.params.category) {
                    newTotal = finances[i].value;
                    total = oldTotal + newTotal;
                    oldTotal = total;
                }
            }
            res.status(200)
            res.json({
                Total: total
            })
        })
    };

    const subCategoryMonthTotal = function (req, res) {
        Finances.find({ user: req.params.user }).exec(function (err, finances) {
            let oldTotal = 0;
            let newTotal = 0;
            let total = 0;

            for (let i = 0; i < finances.length; i++) {
                if (finances[i].month === req.params.month && finances[i].categoria === req.params.categoria && finances[i].subcategoria === req.params.subcategoria) {
                    newTotal = finances[i].value;
                    total = oldTotal + newTotal;
                    oldTotal = total;
                }
            }
            res.status(200)
            res.json({
                Total: total
            })
        })
    };

    const categoryTotal = function (req, res) {
        Finances.find({ user: req.params.user }).exec(function (err, finances) {
            let oldTotal = 0;
            let newTotal = 0;
            let total = 0;

            for (let i = 0; i < finances.length; i++) {
                if (finances[i].categoria == req.params.categoria) {
                    newTotal = finances[i].value;
                    total = oldTotal + newTotal;
                    oldTotal = total;
                }
            }
            res.status(200)
            res.json({
                Total: total
            })
        })
    };

    const monthTotal = function (req, res) {
        Finances.find({ user: req.params.user }).exec(function (err, finances) {
            let oldTotal = 0;
            let newTotal = 0;
            let total = 0;

            for (let i = 0; i < finances.length; i++) {
                if (finances[i].month == req.params.month) {
                    if (finances[i].categoria === 'positive') {
                        newTotal = finances[i].value;
                        total = oldTotal + newTotal;
                        oldTotal = total;
                    } else {
                        newTotal = finances[i].value;
                        total = oldTotal - newTotal;
                        oldTotal = total;
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
        Finances.findById(req.params.id, function (err, finance) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(200);
                res.send(finance);
            }
        })
    };

    const updateFinance = function (req, res) {
        Finances.findByIdAndUpdate(req.params.id, req.body.item, function (err) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(200);
                res.send(`${req.body.item} atualizado`);
            }
        });
    };
    const payFinance = function (req, res) {
        Finances.findByIdAndUpdate(req.params.id, { situation: 'pay' }, function (err, finances) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(200);
                res.send("Status alterado");
            };
        });


    };

    const unpayFinance = function (req, res) {
        Finances.findByIdAndUpdate(req.params.id, { situation: 'unpay' }, function (err, finances) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(200);
                res.send("Status alterado");
            };
        });
    };

    const deleteFinance = function (req, res) {
        Finances.findById(req.params.id, function (err, finances) {
            finances.remove(function (err) {
                if (err) {
                    res.status(204);
                    res.send('ooops... erro ao inserir' + err)
                } else {
                    res.status(200);
                    res.send('deletado com sucesso')
                }
            });
        });
    };

    return {
        addNewFinance: addNewFinance,
        getAllFinances: getAllFinances,
        getFinanceById: getFinanceById,
        updateFinance: updateFinance,
        deleteFinance: deleteFinance,
        categoryMonthTotal: categoryMonthTotal,
        categoryTotal: categoryTotal,
        payFinance: payFinance,
        unpayFinance: unpayFinance,
        monthTotal: monthTotal,
        subCategoryMonthTotal: subCategoryMonthTotal,
    }
};
module.exports = financesController;