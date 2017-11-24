var database = require ('../database');
var User = {
    getAllUser: function(callback){
        return database.query('select * from user', callback);
    },
    getUser: function(userId, callback){
        return database.query('select * from user where userid=?', [userId], callback);
    },
    getUserUrl: function(userId,callback){
        //select * from url inner join user_url on url.id=user_url.url_id where user_id=user_id
        return database.query('select * from url inner join user_url on url.url_id=user_url.url_id where user_id=?',[userId], callback);
    },
    createUser: function (param, callback){
        return database.query('insert into user set ?', [param], callback);
    },
    deleteUser: function(userId, callback){
        return database.query('delete from user where userid=?', [userId], callback);
    },
    getTotalHits:function(urls){
        var hits = 0;
        for (var item in urls) {
          hits += item.hits;
        }
        return hits;
    },
    compileHits: function(urls){
          var hits = 0;
          for (url of urls) {
        
            hits += url.hits;
          }
          return hits;

    },
    topTenUrls:function(urls){
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
}
module.exports = User;