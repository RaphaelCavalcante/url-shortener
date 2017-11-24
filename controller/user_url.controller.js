var database = require('../database');
var UserUrl = {
    createUserUrl: function (userId, urlId, callback) {
        var param = {
            "user_id": userId,
            "url_id": urlId
        };
        database.query('insert into user_url (user_id, url_id) value (?,?)', [param.user_id, param.url_id], callback);
    },
    getTotalHits: function (urls) {
        var hits = 0;
        for (var item in urls) {
            hits += item.hits;
        }
        return hits;
    },
    compileHits: function (urls) {
        var hits = 0;
        for (url of urls) {
            hits += url.hits;
        }
        return hits;

    },
    topTenUrls: function (urls) {
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
        return top.sort(function (a, b) { return b.hits - a.hits; });
    }
};
module.exports = UserUrl;