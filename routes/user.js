var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');

/* ------ GET /users listing. ------ */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* ------ POST /user ------ */
router.post('/', function(req, res, next) {
  User.create({
    name: req.query.username,
    mail: req.query.usermail,
    password: req.query.userpassword
  }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* ------ GET /user/:id. ------ */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* ------ GET /user/name/:name. ------ */
router.get('/name/:name', function(req, res, next) {

  User.findOne({ 'name': req.params.name }, req.body, function (err, user) {
    if (err) return next(err);
    if(user != null){
      res.json(user.id);
    }
    else{
      res.send("non-existent");
    }

  });

  /* ------ GET /user/name/:name. ------ */
  router.get('/name/:name/:password', function(req, res, next) {

    User.findOne({ 'name': req.params.name, 'password': req.params.password }, req.body, function (err, user) {
      if (err) return next(err);
      if(user != null){
        res.json(user);
      }
      else{
        res.send("authentication-failed");
      }

    });



});



/* ------ PUT /user/:id ------ */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* ------ DELETE /user/:id ------ */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
