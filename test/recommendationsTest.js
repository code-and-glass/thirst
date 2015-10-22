var assert = require('assert');
var app = require('../server/middlewares/recommendations.js');

var request = require('supertest');
var db = require('../server/database.js');


describe('POST /rating', function(){
  it('respond with json', function(done){
   //save user to db
   //save drink to db

   request(app)
     .post('/rating')
     .expect('Content-Type', 'text/html')
     .expect(200, done);
  });
});