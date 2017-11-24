const frisby = require ('frisby');

// POST /users
it ('should create a new user and return user', function(done){
    var testRoute="/users"
    frisby
    .post('http://localhost:3000/users', {"id":"chaordic_user"})
    .expect('status', 201)
    .done(done);
});
it('should return conflict if already exists', function(done){
    frisby
    .post('http://localhost:3000/users',{"id":"chaordic_user"})
    .expect('status', 409)
    .done(done);
});
it('should delete user', function(done){
    frisby
    .del('http://localhost:3000/user/1')
    .expect('status', 200)
    .done(done);
});
// needed for other test
it ('should create a new user and return user', function(done){
    var testRoute="/users"
    frisby
    .post('http://localhost:3000/users', {"id":"chaordic_user"})
    .expect('status', 201)
    .done(done);
});