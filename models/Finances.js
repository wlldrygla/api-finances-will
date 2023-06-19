const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financesSchema = new Schema({
    user:String,
    name:String,
    value: Number,
    date:String,
    category: String,
    situation: String,
    month:String,
    startMonth:Number,
    endMonth:Number,
    subcategory:String,
  

},{collection:'finances'})

const Finances = mongoose.model('Finances', financesSchema);

module.exports = Finances;