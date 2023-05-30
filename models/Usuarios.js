const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    usuario: String,
    senha: String

},{collection:'usuarios'})

const Usuarios = mongoose.model('Usuarios',usuarioSchema);

module.exports = Usuarios;