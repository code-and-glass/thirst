var assert = require('assert');
var app = require('../server/middlewares/drinks.js');
var request = require('supertest');
describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe('GET /user', function(){
  it('respond with json', function(done){
   request(app)
     .get('/drinks')
     .expect('Content-Type', /json/)
     .expect(200, done);
  });
});