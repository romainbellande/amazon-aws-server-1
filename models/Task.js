var mongoose = require('mongoose');

/* ------ Project Schema ------ */

var ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  projectId: mongoose.Schema.Types.ObjectId
});

ProjectSchema.statics.findByProjectId = function (projectId, cb) {
  return this.find({ projectId: projectId }, cb);
};




module.exports = mongoose.model('Task',TaskSchema);;
