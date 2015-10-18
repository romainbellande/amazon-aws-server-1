var mongoose = require('mongoose');

/* ------ User Schema ------ */

var UserSchema = new mongoose.Schema({
  name: String,
  mail: String,
  password: String
});

UserSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
}


module.exports = mongoose.model('User',UserSchema);;
