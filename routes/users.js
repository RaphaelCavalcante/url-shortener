var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('select * from users', function(error, results, fields){
    if(error){
      res.send(JSON.stringify({"status":500, "error": error, "response":null}));
    }else{
      res.send(JSON.stringify({"status":200,"error":null,"response":results}));
    }
  });
});

router.post('/', function(req, res, next){
  var input = JSON.parse(JSON.stringify(req.body));
  var data ={
    "name":input.name,
    "surname":input.surname,
    "phone":input.phone,
    "email":input.email,
    "address":input.address,
    "zipcode":input.zipcode
  };
  res.send(data);
  /*connection.query('insert into users values ', function(error, results, fields){
    if(error){
      res.send(JSON.stringify({"status":500, "error": error, "response":null}));
    }else{
    }
  });*/
});
module.exports = router;
