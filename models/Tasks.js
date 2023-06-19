const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    user:String,
    name: String,
    status: String

},{collection:'tasks'})

const Tasks = mongoose.model('Tasks',tasksSchema);

module.exports = Tasks;