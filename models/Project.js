var mongoose = require('mongoose');

/* ------ Project Schema ------ */

var ProjectSchema = new mongoose.Schema({
  name: String,
  customer: String,
  description: String,
  ownerId: mongoose.Schema.Types.ObjectId
});

ProjectSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

ProjectSchema.statics.findByOwnerId = function (ownerId, cb) {
  return this.find({ ownerId: ownerId }, cb);
};




module.exports = mongoose.model('Project',ProjectSchema);;
