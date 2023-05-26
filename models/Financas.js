var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    usuario:String,
    nome:String,
    valor: Number,
    data:String,
    categoria: String,
    situacao: String,
    mes:String,
    mesInicio:Number,
    mesTermino:Number,
    subcategoria:String,
  

},{collection:'financas'})

var Financasbd = mongoose.model('Financasbd',postSchema);

module.exports = Financasbd;