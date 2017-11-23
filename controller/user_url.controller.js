var database = require('../database');
var UserUrl = {
    createUserUrl: function(userId, urlId, callback){
        var param = {
            "user_id": userId,
            "url_id": urlId
        };
        database.query('insert into user_url (user_id, url_id) value (?,?)', [param.user_id, param.url_id], callback);
    }
};
module.exports = UserUrl;