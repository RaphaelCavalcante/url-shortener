var mysql  =require ("mysql");
var connection = mysql.createPool({
    host:'localhost',
    user:'chaordic',
    password:'chaordic123',
    database:'chaordic_url'
  
});

module.exports = connection;