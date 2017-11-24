var database = require('../database');
var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;
var Url = {
    createUrl: function (url_, callback) {
        return database.query("insert into url (hits, url, shortUrl) value (?,?,?)", [url_.hits, url_.url, url_.shortUrl]);
    },
    getAllUrl: function (callback) {
        return database.query("select * from url", callback);
    },
    getUrl: function(urlId, callback){
        return database.query("select * from url where url_id=?",[urlId], callback);
    },
    getUrlByShort: function(shortUrl, callback){
        return database.query("select * from url where shortUrl like \"%/"+ shortUrl +"%\"", callback);
    }
    ,
    deleteUrl: function (urlId,callback) {
        return database.query("delete from url where url_id=?", [urlId], callback);
    },
    updateUrl: function (url, callback) {
        return database.query("update url set hits=? where url_id=?", [url.hits,url.id], callback);
    },
    encodeUrl: function (key) {
        var url = '';
        key+=100000;
        while (key) {
            var index = key % base;
            key = Math.floor(key / base);
            url = alphabet[index] + url;
        }
        return url;
    }
};
module.exports = Url;