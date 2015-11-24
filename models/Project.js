var mongoose = require('mongoose');
var Task = require('./Task.js');
var Resource = require('./Resource.js');

/* ------ Project Schema ------ */
var projectSchema = new mongoose.Schema({
  name: String,
  customer: String,
  description: String,
  ownerId: mongoose.Schema.Types.ObjectId,
  tasks: [Task.schema],
  resources: [Resource.schema]
});

projectSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

projectSchema.statics.findByOwnerId = function (ownerId, cb) {
  return this.find({ ownerId: ownerId }, cb);
};



module.exports = mongoose.model('Project',projectSchema);
