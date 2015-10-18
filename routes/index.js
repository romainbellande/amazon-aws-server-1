var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello, World' });
});

/* ------ GET USERLIST ------ */




module.exports = router;
