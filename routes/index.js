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
router.delete('/user/:userid', function (req, res, next) {
  userController.deleteUser(req.params.userid, function (err, results, fields) {
    if (results.affectedRows == 0) {
      res.status('404').send("Not Found");
    } else {
      res.send({});
    }
  });
});
router.get('/users', function (requ, res, next) {
  userController.getAllUser(function (err, result, fields) {
    res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
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
        data.topUrls = topTenUrls(result.slice(0,10));
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
          console.log(result[values-1]);
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
router.get('/stats', function (req, res, next) {
  var data = {
    "hits": 0,
    "urlCount": 0,
    topUrls: []
  };
  urlController.getAllUrl(function (err, result, fields) {
    data.hits = compileHits(result);
    data.urlCount = result.length;
    data.topUrls = topTenUrls(result.slice(0, 10));
    res.send({ "status": 200, "result": data });
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
      result[0].hits += 1;
      urlController.updateUrl(result[0], function (err, result, field) {
        console.log(err);
      });
      res.redirect(301, url);
    }
  });
});
router.delete('/urls/:urlid', function (req, res, next) {
  urlController.deleteUrl(req.params.urlid, function (err, result, fields) {
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
function compileHits(urls) {
  var hits = 0;
  for (url of urls) {

    hits += url.hits;
  }
  return hits;
}
function topTenUrls(urls) {
  var top = new Array();
  for (var data of urls) {
    var url = {};
    url.id = data.url_id;
    url.hits = data.hits;
    url.url = data.url;
    url.shortUrl = data.shortUrl;
    console.log(url);
    top.push(url);
  }
  return top.sort(function(a, b){ return b.hits - a.hits;});
}
module.exports = router;
