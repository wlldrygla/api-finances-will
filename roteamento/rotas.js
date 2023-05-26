var express = require('express');
var Financasbd = require('../models/Financas.js');
var Usuarios = require('../models/Usuarios.js');

var financasController = require('../controladores/controlador')(Financasbd, Usuarios);
var financasRouter = express.Router();
financasRouter.route('/api/financa/:usuario')
    .get(financasController.get);




financasRouter.route('/api/total/:categoria/:mes/:usuario')
    .get(financasController.totalCategoria);


financasRouter.route("/api/cadastro")
    .post(financasController.add);

financasRouter.route("/api/login")
    .post(financasController.login);

financasRouter.route("/api/finalizar/:id")
   .post(financasController.mudarParaFinalizado)

financasRouter.route("/api/pendente/:id")
   .post(financasController.mudarParaPendente)


financasRouter.route('/:id')    
   .get(financasController.getById)
   .post(financasController.update)
   .delete(financasController.del);
module.exports = financasRouter;  