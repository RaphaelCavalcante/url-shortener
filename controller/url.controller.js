var database = require('../database');
var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;
var Url = {
    createUrl: function (url, callback) {
        return database.query("insert into url set ?", [url]);
    },
    getAllUrl: function (callback) {
        var value;
        database.query("select * from url", callback);
    }
    ,
    deleteUrl: function (urlId) {
        return database.query("delete from url where id=?", [urlId]);
    },
    updateUrl: function (url) {
        return databsae.query();
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