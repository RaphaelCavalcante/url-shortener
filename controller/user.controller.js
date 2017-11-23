var database = require ('../database');
var User = {
    getAllUser: function(callback){
        return database.query('select * from user', callback);
    },
    getUser: function(userId){
        return database.query('select * from user where usrid=?', [usrid]);
    },
    getUserUrl: function(userId){
        // INNER JOIN
    },
    createUser: function (param){
        return database.query('insert into user set ', [param]);
    },
    deleteUser: function(userId){
        return database.query('delete from user where id=?', [userId]);
    }
}
module.exports = User;