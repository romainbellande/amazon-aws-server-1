var mongoose = require('mongoose');

/* ------ Project Schema ------ */

var resourceSchema = new mongoose.Schema({
  name: String,
  description: String,
  value: Number
});

module.exports = mongoose.model('Resource',resourceSchema);
