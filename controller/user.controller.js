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
    }
}
module.exports = User;