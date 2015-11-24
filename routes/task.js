var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/Project.js');

/* ------ GET /:projectId/task ------
    Function : Get tasks
    params: projectId
*/
router.get('/:projectId/task', function(req, res, next) {
    Project.findById(req.params.projectId, function (err, project) {
      var tasks;
      if (!err) tasks = project.tasks;
      res.json(tasks);
    });
});

/* ------ POST /:projectId/task ------
    Function : Create a task
    params: projectId
*/
router.post('/:projectId/task', function(req, res, next) {
    Project.findById(req.params.projectId, function (err, project) {
      if (err) return next(err);
      var length = project.tasks.push({
        name: req.query.task_name,
        description: req.query.task_description
      });
      project.save(function (err, project) {
        res.json(project.tasks[length-1]);
      });
    });
});

/* ------ GET /:projectId/task/:id. ------
    Function : Get a task
    params: projectId, id
*/
router.get('/:projectId/task/:id', function(req, res, next) {
    Project.findById(req.params.projectId, function (err, project) {
      var task;
      if (!err) task = project.tasks.id(req.params.id);
      res.json(task);
    });
});


/* ------ PUT /:projectId/task/:id ------
    Function : Update a task
    params: projectId, id
*/
router.put('/:projectId/task/:id', function(req, res, next) {
    var query = {
        "_id": req.params.projectId,
        "tasks._id": req.params.id
    };
    var update = {
        "tasks.$.name": req.query.task_name,
        "tasks.$.description": req.query.task_description
    };
    var options = {new: true};
    Project.findOneAndUpdate(query,update,options,
        function(err,project){
            if(err) console.log(err);
            res.json(project.tasks.id(req.params.id));

        });
    });
/* ------ DELETE /:projectId/task/:id ------
    Function : Delete a task
    params: projectId, id
*/
    router.delete('/:projectId/task/:id', function(req, res, next) {
        Project.findById(req.params.projectId, function (err, project) {
            if (err) return next(err);
            project.tasks.id(req.params.id).remove();
            project.save(function (err) {
                res.send(err);
            });
        });
    });

    module.exports = router;
