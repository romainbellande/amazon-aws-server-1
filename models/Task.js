var mongoose = require('mongoose');

/* ------ Project Schema ------ */

var taskSchema = new mongoose.Schema({
  name: String,
  description: String
});


module.exports = mongoose.model('Task',taskSchema);
