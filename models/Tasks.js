const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    user:String,
    task: String,
    status: String

},{collection:'tasks'})

const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = Tasks;