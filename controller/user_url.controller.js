var database = require('../database');
var UserUrl = {
    createUserUrl: function(userId, urlId, callback){
        var param = {
            "userId": userId,
            "urlId": urlId
        };
        database.query('insert into user_url set ?', [param], callback);
    }
};