var express = require('express');
var router = express.Router();
var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;
var connection = require('../database');

router.get('/', function (req, res, next) {
  connection.query('select * from user', function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
    } else {
      res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    }
  });
});

router.post('/:userid/urls', function(req, res, next){

});

router.post('/', function (req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    "id": input.id
  };
  connection.query('insert into user set ?', [data], function (error, results, fields) {
    if (error.code == "ER_DUP_ENTRY") {
      res.status('409')
      res.send("conflict");
    } else {
      res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    }
  });
});

function encode(id) {
  var url = '';
  while (id) {
    var index = id % base;
    id = Math.floor(id / base);
    url = alphabet[index].toString + url;
  }
  return url;
}
module.exports = router;
