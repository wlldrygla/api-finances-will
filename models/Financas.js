const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
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

const Financesbd = mongoose.model('Financesbd',postSchema);

module.exports = Financesbd;