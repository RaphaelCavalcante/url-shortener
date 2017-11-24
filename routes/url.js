var express = require('express');
var router = express.Router();
var connection = require('../database');

router.get('/:id', function (req, res, next) {
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
router.delete('/:urlid', function (req, res, next) {
  urlController.deleteUrl(req.params.urlid, function (err, result, fields) {
    res.send({});
  });
});
module.exports = router;
