var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    usuario: String,
    senha: String

},{collection:'usuarios'})

var Usuarios = mongoose.model('Usuarios',usuarioSchema);

module.exports = Usuarios;