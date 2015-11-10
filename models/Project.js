var mongoose = require('mongoose');
var Task = require('./Task.js');

/* ------ Project Schema ------ */
var projectSchema = new mongoose.Schema({
  name: String,
  customer: String,
  description: String,
  ownerId: mongoose.Schema.Types.ObjectId,
  tasks: [Task.schema]
});

projectSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

projectSchema.statics.findByOwnerId = function (ownerId, cb) {
  return this.find({ ownerId: ownerId }, cb);
};
/* ------ TASKS ------ */
projectSchema.statics.createTask = function(id, name, description, callback){
  this.findById(id, function (err, project) {
    if (err) return next(err);
    var length = project.tasks.push({
      name: name,
      description: description
    });
    project.save(function (err, project) {
      callback(err,project.tasks[length-1]);
    });
  });
};

projectSchema.statics.removeTask = function(projectId, taskId, callback){
  this.findById(projectId, function (err, project) {
    if (err) return next(err);
    project.tasks.id(taskId).remove();
    project.save(function (err) {
      callback(err);
    });
  });
};

projectSchema.statics.getTasks = function(projectId, callback){
  this.findById(projectId, function (err, project) {
    var tasks;
    if (!err) tasks = project.tasks;
    callback(err, tasks);
  });
};

projectSchema.statics.getTask = function(projectId, taskId, callback){
  this.findById(projectId, function (err, project) {
    var task;
    if (!err) task = project.tasks.id(taskId);
    callback(err, task);
  });
};


module.exports = mongoose.model('Project',projectSchema);
