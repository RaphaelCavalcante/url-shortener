var express = require('express');
var router = express.Router();
var userController = require('../controller/user.controller');
var urlController = require('../controller/url.controller');
var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/users', function(requ, res, next){
  userController.getAllUser(function(err, result, fields){
    res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
  });
});
router.post('/users/:userid/urls', function(req, res, next){
  var input = JSON.parse(JSON.stringify(req.body));
  var data= {
    'url': input.url,
    'hits': 0,
    'shortUrl':''
  };
  urlController.getAllUrl(function (err, result, fields){
    var values = result.length;
    var key;
    var url="http://short-url.com/";
    if(values == 0){
      key=100000;
    }else{
      key = result[values-1].id+1;
    }
    url+=urlController.encodeUrl(key);
    data.shortUrl=url;
    urlController.createUrl(data);
    res.send(data);
  });
});
module.exports = router;
