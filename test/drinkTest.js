var assert = require('assert');
var app = require('../server/middlewares/drinks.js');
var request = require('supertest');
var db = require('../server/database.js');


describe('GET /drinks', function(){
  it('respond with json', function(done){
    request(app)
      .get('/drinks')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });

  it('should respond with one drink object', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.length = 1;
      })
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });

  it('should have an id and name property', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.id = res.id;
      })
      .expect(function(res) {
        res.id !== undefined;
        res.name !== undefined;
      })
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});