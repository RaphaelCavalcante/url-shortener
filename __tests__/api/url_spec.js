var frisby = require('frisby');

it('should create an url', function(done){
    frisby
    .post('http://localhost:3000/users/3/urls',{"url":"http://google.com"})
    .expect("status", 201)
    .done(done);
});
it('should return 404 on unknow user', function(done){
    frisby
    .post('http://localhost:3000/users/123/urls',{"url":"http://github.com"})
    .expect("status", 404)
    .done(done);
});