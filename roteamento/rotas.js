const express = require('express');
const Financesbd = require('../models/Financas.js');
const Usuarios = require('../models/Usuarios.js');
const Metas = require('../models/Metas.js')
const financesController = require('../controladores/controlador')(Financesbd, Usuarios, Metas);

const financesRouter = express.Router();

financesRouter.route('/finance/get-all/:usuario')
    .get(financesController.getAllFinances);

financesRouter.route('/finance/category-month-total/:categoria/:mes/:usuario')
    .get(financesController.categoryMonthTotal);

financesRouter.route('/finance/total-category/:usuario/:categoria')
    .get(financesController.categoryTotal);

financesRouter.route('/finance/subcategory-month-total/:categoria/:mes/:usuario/:subcategoria')
    .get(financesController.subCategoryMonthTotal);

financesRouter.route('/finance/month-statement-total/:usuario/:mes')
    .get(financesController.monthTotal);

financesRouter.route("/finance/insert")
    .post(financesController.addNewFinance);

financesRouter.route("/user/login")
    .post(financesController.userLogin);

financesRouter.route("/finance/pendente/:id")
    .post(financesController.mudarParaFinalizado)

financesRouter.route("/finance/finalizado/:id")
    .post(financesController.mudarParaPendente)

financesRouter.route('/finance/:id')
    .get(financesController.getFinanceById)
    .post(financesController.updateFinance)
    .delete(financesController.deleteFinance);

financesRouter.route('/task/:id')
    // .get(financesController.getFinanceById)
    // .post(financesController.updateFinance)
    .delete(financesController.deleteTask);

financesRouter.route('/task/:usuario')
    .get(financesController.getMetas);

financesRouter.route("/task/cadastro")
    .post(financesController.addMetas);

financesRouter.route("/task/done/:id")
    .post(financesController.changeTaskToDone)

financesRouter.route("/task/doing/:id")
    .post(financesController.changeTaskToDoing)

financesRouter.route("/task/to-do/:id")
    .post(financesController.changeTaskToDo)

financesRouter.route("/task/update-all")
    .post(financesController.updateAll);


module.exports = apiRoutes;  