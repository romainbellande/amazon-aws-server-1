var mongoose = require('mongoose');

/* ------ Project Schema ------ */

var taskSchema = new mongoose.Schema({
  name: String,
  description: String
});

taskSchema.statics.findByProjectId = function (projectId, cb) {
  return this.find({ projectId: projectId }, cb);
};


module.exports = mongoose.model('Task',taskSchema);
