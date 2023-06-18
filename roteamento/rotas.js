const express = require('express');
const Financesbd = require('../models/Financas.js');
const Usuarios = require('../models/Usuarios.js');
const Metas = require('../models/Metas.js')
const financesController = require('../controladores/controlador')(Financesbd, Usuarios, Metas);

const apiRoutes = express.Router();

apiRoutes.route('/finance/get-all/:usuario')
    .get(financesController.getAllFinances);

apiRoutes.route('/finance/category-month-total/:categoria/:mes/:usuario')
    .get(financesController.categoryMonthTotal);

apiRoutes.route('/finance/total-category/:usuario/:categoria')
    .get(financesController.categoryTotal);

apiRoutes.route('/finance/subcategory-month-total/:categoria/:mes/:usuario/:subcategoria')
    .get(financesController.subCategoryMonthTotal);

apiRoutes.route('/finance/month-statement-total/:usuario/:mes')
    .get(financesController.monthTotal);

apiRoutes.route("/finance/insert")
    .post(financesController.addNewFinance);

apiRoutes.route("/user/login")
    .post(financesController.userLogin);

apiRoutes.route("/finance/pendente/:id")
    .post(financesController.mudarParaFinalizado)

apiRoutes.route("/finance/finalizado/:id")
    .post(financesController.mudarParaPendente)

apiRoutes.route('/finance/:id')
    .get(financesController.getFinanceById)
    .post(financesController.updateFinance)
    .delete(financesController.deleteFinance);

apiRoutes.route('/task/:id')
    // .get(financesController.getFinanceById)
    // .post(financesController.updateFinance)
    .delete(financesController.deleteTask);

apiRoutes.route('/task/get-all/:usuario')
    .get(financesController.getMetas);

apiRoutes.route("/task/cadastro")
    .post(financesController.addMetas);

apiRoutes.route("/task/done/:id")
    .post(financesController.changeTaskToDone)

apiRoutes.route("/task/doing/:id")
    .post(financesController.changeTaskToDoing)

apiRoutes.route("/task/to-do/:id")
    .post(financesController.changeTaskToDo)


module.exports = apiRoutes;  