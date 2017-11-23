var database= require('../database');
var Url = {
    getUrl:function(urlId){
        return database.query("select * from url where id=?", [urlId]);
    },
    createUrl:function(url){
        return database.query("insert into url set ", [url]);
    },
    deleteUrl:function(urlId){
        return database.query("delete from url where id=?", [urlId]);
    },
    updateUrl: function(url){
        return databsae.query();
    }
}