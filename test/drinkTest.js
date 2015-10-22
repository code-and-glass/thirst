var assert = require('assert');
var app = require('../server/middlewares/drinks.js');
var request = require('supertest');
var db = require('../server/database.js');

describe('GET /drinks', function(){
  it('respond with json', function(done){
   
   request(app)
     .get('/drinks')
     .expect('Content-Type', /json/)
     .expect(200, done);
  });
});