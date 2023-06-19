const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: String,
    password: String

},{collection:'users'})

const Users = mongoose.model('Users',userSchema);

module.exports = Users;