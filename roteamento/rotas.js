const express = require('express');
const Finances = require('../models/Finances.js');
const Users = require('../models/Users.js');
const Tasks = require('../models/Tasks.js');
const financesController = require('../control/financesController.js')(Finances);
const tasksController = require('../control/tasksController.js')(Tasks);
const usersController = require('../control/usersControllers.js')(Users)
const apiRoutes = express.Router();

apiRoutes.route('/finance/get-all/:user')
    .get(financesController.getAllFinances);

apiRoutes.route('/finance/category-month-total/:category/:month/:user')
    .get(financesController.categoryMonthTotal);

apiRoutes.route('/finance/total-category/:user/:category')
    .get(financesController.categoryTotal);

apiRoutes.route('/finance/subcategory-month-total/:category/:month/:user/:subcategory')
    .get(financesController.subCategoryMonthTotal);

apiRoutes.route('/finance/month-statement-total/:user/:month')
    .get(financesController.monthTotal);

apiRoutes.route("/finance/insert")
    .post(financesController.addNewFinance);

apiRoutes.route("/finance/pay/:id")
    .post(financesController.payFinance)

apiRoutes.route("/finance/unpay/:id")
    .post(financesController.unpayFinance)

apiRoutes.route('/finance/:id')
    .get(financesController.getFinanceById)
    .post(financesController.updateFinance)
    .delete(financesController.deleteFinance);



apiRoutes.route("/user/login")
    .post(usersController.userLogin);




apiRoutes.route('/task/:id')
    // .get(financesController.getFinanceById)
    // .post(financesController.updateFinance)
    .delete(tasksController.deleteTask);

apiRoutes.route('/task/get-all/:user')
    .get(tasksController.getTasks);

apiRoutes.route("/task/insert")
    .post(tasksController.addTasks);

apiRoutes.route("/task/done/:id")
    .post(tasksController.changeTaskToDone)

apiRoutes.route("/task/doing/:id")
    .post(tasksController.changeTaskToDoing)

apiRoutes.route("/task/to-do/:id")
    .post(tasksController.changeTaskToDo)





module.exports = apiRoutes;  