var express = require('express');
var router = express.Router();
var userController = require('../controller/user.controller');
var urlController = require('../controller/url.controller');
var userUrlController = require('../controller/user_url.controller');

var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
