var mongoose = require('mongoose');
var Project = require('./Project.js');

/* ------ User Schema ------ */

var userSchema = new mongoose.Schema({
  name: String,
  mail: String,
  password: String,
  projects: [Project]
});

userSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
}


module.exports = mongoose.model('User',userSchema);;
