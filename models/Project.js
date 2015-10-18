var mongoose = require('mongoose');

/* ------ User Schema ------ */

var ProjectSchema = new mongoose.Schema({
  name: String,
  client: ObjectId,
  staff: [ObjectId],
  descr: String
});

ProjectSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
}


module.exports = mongoose.model('Project',UserSchema);;
