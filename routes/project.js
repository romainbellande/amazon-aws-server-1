var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Project = require('../models/Project.js');
var Task = require('../models/Task.js');

/* ------ GET /users listing. ------ */
router.get('/', function(req, res, next) {
  Project.find(function (err, projects) {
    if (err) return next(err);
    res.json(projects);
  });
});

/* ------ POST /project ------ */
router.post('/', function(req, res, next) {
  Project.create({
    name: req.query.project_name,
    customer: req.query.project_customer,
    description: req.query.project_description,
    ownerId: req.query.project_ownerid
  }, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log(post);
  });
});

/* ------ GET /project/:id. ------ */
router.get('/:id', function(req, res, next) {
  Project.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* ------ GET /project/owner/:id. ------ */
router.get('/owner/:id', function(req, res, next) {
  Project.findByOwnerId(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});




/* ------ PUT /project/:id ------ */
router.put('/:id', function(req, res, next) {
  Project.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* ------ DELETE /project/:id ------ */
router.delete('/:id', function(req, res, next) {
  Project.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
  Project.tasks.remove({});
});

module.exports = router;
