var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/Project.js');

/* ------ GET /:projectId/task ------ */
router.get('/:projectId/task', function(req, res, next) {
    Project.getTasks(
        req.params.projectId,
        function(err,tasks){
            if(err) console.log(err);
            res.json(tasks);
        }
    );
});

/* ------ POST /:projectId/task ------ */
router.post('/:projectId/task', function(req, res, next) {
    Project.createTask(
        req.params.projectId,
        req.query.task_name,
        req.query.task_description, function(err, task){
            if(err) console.log(err);
            res.json(task);
        }
    );
});

/* ------ GET /:projectId/task/:id. ------ */
router.get('/:projectId/task/:id', function(req, res, next) {
    Project.getTask(
        req.params.projectId,
        req.params.id,
        function(err, task){
            if(err) console.log(err);
            res.json(task);
        });
    });


    /* ------ PUT /:projectId/task/:id ------ */
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
        /* ------ DELETE /:projectId/task/:id ------ */
        router.delete('/:projectId/task/:id', function(req, res, next) {
            Project.removeTask(
                req.params.projectId,
                req.params.id,
                function(err){
                    if(err){
                        console.log(err);
                        res.send(500);
                    }
                    res.send(200);
                });
            });

            module.exports = router;
