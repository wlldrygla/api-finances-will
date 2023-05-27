const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metasSchema = new Schema({
    name: String,
    status: String

},{collection:'metas'})

const Metas = mongoose.model('Metas',metasSchema);

module.exports = Metas;