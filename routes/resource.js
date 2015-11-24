var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/Project.js');

/* ------ GET /:projectId/resource ------
    Function : Get resources
    params: projectId
*/
router.get('/:projectId/resource', function(req, res, next) {
    Project.findById(req.params.projectId, function (err, project) {
      var resources;
      if (!err) resources = project.resources;
      res.json(resources);
    });
});

/* ------ POST /:projectId/resource ------
    Function : Create a resource
    params: projectId
*/
router.post('/:projectId/resource', function(req, res, next) {
    Project.findById(req.params.projectId, function (err, project) {
      if (err) return next(err);
      var length = project.resources.push({
        name: req.query.resource_name,
        description: req.query.resource_description,
        value: req.query.resource_value
      });
      project.save(function (err, project) {
        res.json(project.resources[length-1]);
      });
    });
});

/* ------ GET /:projectId/resource/:id. ------
    Function : Get a resource
    params: projectId, id
*/
router.get('/:projectId/resource/:id', function(req, res, next) {
    Project.findById(req.params.projectId, function (err, project) {
      var resource;
      if (!err) resource = project.resources.id(req.params.id);
      res.json(resource);
    });
});


/* ------ PUT /:projectId/resource/:id ------
    Function : Update a resource
    params: projectId, id
*/
router.put('/:projectId/resource/:id', function(req, res, next) {
    var query = {
        "_id": req.params.projectId,
        "resources._id": req.params.id
    };
    var update = {
        "resources.$.name": req.query.resource_name,
        "resources.$.description": req.query.resource_description,
        "resources.$.value": req.query.resource_value
    };
    var options = {new: true};
    Project.findOneAndUpdate(query,update,options,
        function(err,project){
            if(err) console.log(err);
            res.json(project.resources.id(req.params.id));

        });
    });
/* ------ DELETE /:projectId/resource/:id ------
    Function : Delete a resource
    params: projectId, id
*/
    router.delete('/:projectId/resource/:id', function(req, res, next) {
        Project.findById(req.params.projectId, function (err, project) {
            if (err) return next(err);
            project.resources.id(req.params.id).remove();
            project.save(function (err) {
                res.send(err);
            });
        });
    });

    module.exports = router;
