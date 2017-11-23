var database = require ('../database');
var User = {
    getUser: function(userId){
        return database.query('select * from user where id=?', [id]);
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