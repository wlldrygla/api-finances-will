const express = require('express');
const Financesbd = require('../models/Financas.js');
const Usuarios = require('../models/Usuarios.js');
const Metas = require('../models/Metas.js')
const financesController = require('../controladores/controlador')(Financesbd, Usuarios, Metas);

const financesRouter = express.Router();

financesRouter.route('/api/financa/:usuario')
    .get(financesController.get);

financesRouter.route('/api/total/:categoria/:mes/:usuario')
    .get(financesController.totalCategoria);


financesRouter.route("/api/cadastro")
    .post(financesController.add);

financesRouter.route("/api/login")
    .post(financesController.login);

financesRouter.route("/api/finalizar/:id")
    .post(financesController.mudarParaFinalizado)

financesRouter.route("/api/pendente/:id")
    .post(financesController.mudarParaPendente)


financesRouter.route('/:id')
    .get(financesController.getById)
    .post(financesController.update)
    .delete(financesController.del);

financesRouter.route('/api/metas/:usuario')
    .get(financesController.getMetas);

financesRouter.route("/api/metas/cadastro")
    .post(financesController.addMetas);

financesRouter.route("/api/meta/finalizar/:id")
    .post(financesController.mudarMetaFinalizado)

financesRouter.route("/api/meta/fazendo/:id")
    .post(financesController.mudarMetaFazendo)
    
financesRouter.route("/api/meta/pendente/:id")
    .post(financesController.mudarMetaPendente)

module.exports = financesRouter;  