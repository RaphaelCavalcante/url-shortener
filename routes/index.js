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
router.get('/users', function (requ, res, next) {
  userController.getAllUser(function (err, result, fields) {
    res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
  });
});
router.get('/users/:userid/stats', function(req, res, next){
  var data = {
    "hits": 0,
    "urlCount": 0,
    topUrls: []
  };
  userController.getUserUrl(req.params.userid, function(err, result, fields){
    data.hits=compileHits(result);
    data.urlCount=result.length;
    data.topUrls= JSON.parse(JSON.stringify((topTenUrls(result.slice(0, 10).sort(function(a, b){ return a - b;})))));
    res.send({"status":200, "result":data});
  });
});
router.post('/users/:userid/urls', function (req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    'id': 0,
    'url': input.url,
    'hits': 0,
    'shortUrl': ''
  };
  urlController.getAllUrl(function (err, result, fields) {
    var url = "http://short-url.com/";
    var values = result.length;
    var key;
    if (values == 0) {
      key = 100000;
    } else {
      console.log(result[values-1]);
      key=result[values-1].id;
    }
    url += urlController.encodeUrl(key);
    data.shortUrl = url;
    data.id = key;
    urlController.createUrl(data);
    userUrlController.createUserUrl(req.params.userid, key, function(res, err, fields){
      //console.log(err);
    });

    res.status(201).send(data);
  });
});
router.get('/stats', function (req, res, next) {
  var data = {
    "hits": 0,
    "urlCount": 0,
    topUrls: []
  };
  urlController.getAllUrl(function (err, result, fields) {
    data.hits=compileHits(result);
    data.urlCount=result.length;
    data.topUrls=result.slice(0, 10);
    res.send({"status":200, "result":data});
  });
});
router.get('/stats/:urlid', function (req, res, next) {
  urlController.getUrl(req.params.urlid, function (err, result, fields) {
    res.send(result);
  });
});
router.get('/urls/:id', function (req, res, next) {
  urlController.getUrlByShort(req.params.id, function (err, result, fields) {
    if (result.length == 0) {
      res.status(404).send('Not found');
    } else {
      var url = '';
      if (result[0].url.indexOf('http://') !== -1) {
        url = result[0].url;
      } else {
        url = 'http://' + result[0].url;
      }
      result[0].hits+=1;
      urlController.updateUrl(result[0], function(err, result, field){
        console.log(err);
      });
      res.redirect(301, url);
    }
  });
});
router.delete('/urls/:urlid', function(req, res, next){
  urlController.deleteUrl(req.params.urlid, function(err, result, fields){
      res.send({});
  });
});
function getTotalHits(urls) {
  var hits = 0;
  for (var item in urls) {
    hits += item.hits;
  }
  return hits;
}
function compileHits(urls){
  var hits=0;
  for( url of urls){
    
    hits+=url.hits;
  }
  return hits;
}
function topTenUrls(urls){
  var top =new Array();
  var url={
    id: 0,
    hits: 0,
    url: '',
    shortUrl: ''
  }
  for(var data of urls ){
    url.id = data.url_id;
    url.hits = data.hits;
    url.url = data.url;
    url.shortUrl = data.shortUrl;
    console.log(url);
    top.push(url);
  }//urls.slice(0, 10).sort(function(a, b){ return a - b;});
  return top;
}
module.exports = router;
