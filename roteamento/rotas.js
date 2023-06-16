const express = require('express');
const Financesbd = require('../models/Financas.js');
const Usuarios = require('../models/Usuarios.js');
const Metas = require('../models/Metas.js')
const financesController = require('../controladores/controlador')(Financesbd, Usuarios, Metas);

const financesRouter = express.Router();

financesRouter.route('/api/get-all-finances/:usuario')
    .get(financesController.getAllFinances);

financesRouter.route('/api/category-month-total/:categoria/:mes/:usuario')
    .get(financesController.categoryMonthTotal);

financesRouter.route('/api/total-category/:usuario/:categoria')
    .get(financesController.categoryTotal);

    financesRouter.route('/api/subcategory-month-total/:categoria/:mes/:usuario/:subcategoria')
    .get(financesController.subCategoryMonthTotal);

financesRouter.route('/api/month-statement-total/:usuario/:mes')
    .get(financesController.monthTotal);

financesRouter.route("/api/insert-finance")
    .post(financesController.addNewFinance);

financesRouter.route("/api/login")
    .post(financesController.userLogin);

financesRouter.route("/api/finance/pendente/:id")
    .post(financesController.mudarParaFinalizado)

financesRouter.route("/api/finance/finalizado/:id")
    .post(financesController.mudarParaPendente)

financesRouter.route('/finance/:id')
    .get(financesController.getFinanceById)
    .post(financesController.updateFinance)
    .delete(financesController.deleteFinance);

    financesRouter.route('/task/:id')
    // .get(financesController.getFinanceById)
    // .post(financesController.updateFinance)
    .delete(financesController.deleteTask);

financesRouter.route('/api/metas/:usuario')
    .get(financesController.getMetas);

financesRouter.route("/api/metas/cadastro")
    .post(financesController.addMetas);

financesRouter.route("/api/metas/finalizar/:id")
    .post(financesController.changeTaskToDone)

financesRouter.route("/api/metas/fazendo/:id")
    .post(financesController.changeTaskToDoing)

financesRouter.route("/api/metas/pendente/:id")
    .post(financesController.changeTaskToDo)

module.exports = financesRouter;  