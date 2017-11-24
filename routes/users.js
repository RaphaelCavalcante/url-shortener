var express = require('express');
var router = express.Router();
var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;
var userController = require('../controller/user.controller');

router.delete('/user/:userid', function (req, res, next) {
  userController.deleteUser(req.params.userid, function (err, results, fields) {
    if (results.affectedRows == 0) {
      res.status('404').send("Not Found");
    } else {
      res.send({});
    }
  });
});

module.exports = router;
