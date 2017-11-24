var express = require('express');
var router = express.Router();
var userController = require('../controller/user.controller');
var urlController = require('../controller/url.controller');
var userUrlController = require('../controller/user_url.controller');

var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;

router.post('/users', function (req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    "id": input.id
  };

  userController.createUser(data, function (err, results, fields) {
    if (err != null && err.code == "ER_DUP_ENTRY") {
      res.status('409').send("conflict");
    } else {
      res.status(201).send(data);
    }
  });
});

// Delete
router.delete('/user/:userid', function (req, res, next) {
  userController.deleteUser(req.params.userid, function (err, results, fields) {
    if (results.affectedRows == 0) {
      res.status('404').send("Not Found");
    } else {
      res.send({});
    }
  });
});

router.get('/users/:userid/stats', function (req, res, next) {
  userController.getUser(req.params.userid, function (err, result, fields) {
    if (Object.keys(result).length === 0 && result.constructor === Array) {
      res.status(404).send("Not found");
    } else {
      userController.getUserUrl(req.params.userid, function (err, result, fields) {
        var data = {
          "hits": 0,
          "urlCount": 0,
          topUrls: []
        };
        console.log(result);
        data.hits = compileHits(result);
        data.urlCount = result.length;
        //data.topUrls = JSON.parse(JSON.stringify((topTenUrls(result.slice(0, 10).sort(function (a, b) { return a - b; })))));
        data.topUrls = topTenUrls(result.slice(0, 10));
        res.send({ data });
      });
    }
  });

});


router.post('/users/:userid/urls', function (req, res, next) {
  userController.getUser(req.params.userid, function (err, result, fields) {
    if (result.length == 0) {
      res.status(404).send("User Not Found");
    } else {
      var input = JSON.parse(JSON.stringify(req.body));
      var data = {
        'url_id': 0,
        'url': input.url,
        'hits': 0,
        'shortUrl': ''
      };
      urlController.getAllUrl(function (err, result, fields) {
        var url = "http://localhost:3000/";
        var values = result.length;
        var key;
        if (values == 0) {
          key = 100000;
        } else {
          key = result[values - 1].url_id;
          console.log(result[values - 1]);
        }
        url += urlController.encodeUrl(key);
        data.shortUrl = url;
        data.url_id = key;
        urlController.createUrl(data);
        userUrlController.createUserUrl(req.params.userid, key);
        res.status(201).send(data);
      });
    }
  });

});
module.exports = router;
