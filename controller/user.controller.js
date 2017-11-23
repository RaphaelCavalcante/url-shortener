var database = require ('../database');
var User = {
    getAllUser: function(callback){
        return database.query('select * from user', callback);
    },
    getUser: function(userId){
        return database.query('select * from user where usrid=?', [usrid]);
    },
    getUserUrl: function(userId,callback){
        //select * from url inner join user_url on url.id=user_url.url_id where user_id=user_id
        return database.query('select * from url inner join user_url on url.id=user_url.url_id where user_id=?',[userId], callback);
    },
    createUser: function (param){
        return database.query('insert into user set ', [param]);
    },
    deleteUser: function(userId){
        return database.query('delete from user where id=?', [userId]);
    }
}
module.exports = User;