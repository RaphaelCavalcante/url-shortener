var express = require('express');
var router = express.Router();
var userController = require('../controller/user.controller');
var urlController = require('../controller/url.controller');
var userUrlController = require('../controller/user_url.controller');

router.get('/', function (req, res, next) {
    urlController.getAllUrl(function (err, result, fields) {
        var data = {
            "hits": 0,
            "urlCount": 0,
            topUrls: []
        };
        data.hits = userUrlController.compileHits(result);
        data.urlCount = result.length;
        data.topUrls = userUrlController.topTenUrls(result.slice(0, 10));
        res.send({ "status": 200, "result": data });
    });
});
router.get('/:urlid', function (req, res, next) {
    urlController.getUrl(req.params.urlid, function (err, result, fields) {
        res.send(result);
    });
});
module.exports = router;