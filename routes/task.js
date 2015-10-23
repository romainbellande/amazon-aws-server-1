var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../models/Task.js');

/* ------ GET /users listing. ------ */
router.get('/', function(req, res, next) {
  Project.find(function (err, tasks) {
    if (err) return next(err);
    res.json(tasks);
  });
});

/* ------ POST /task ------ */
router.post('/', function(req, res, next) {
  Task.create({
    name: req.query.task_name,
    description: req.query.task_description,
    projectId: req.query.task_projectid
  }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* ------ GET /task/:id. ------ */
router.get('/:id', function(req, res, next) {
  Task.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* ------ GET /task/project/:id. ------ */
router.get('/project/:id', function(req, res, next) {
  Task.findByProjectId(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});




/* ------ PUT /task/:id ------ */
router.put('/:id', function(req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* ------ DELETE /task/:id ------ */
router.delete('/:id', function(req, res, next) {
  Task.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
