var assert = require('assert');
var app = require('../server/middlewares/drinks.js');
var request = require('supertest');
var db = require('../server/database.js');

describe('GET /drinks', function(){
  it('should respond with json', function(done){
    request(app)
      .get('/drinks')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });

  it('should respond with a list of all of the drinks', function(done) {
    request(app)
      .get('/drinks')
      .expect(function (res) {
        if (res.body.length !== 3553) {
          throw new Error("list length is " + res.body.length);
        };
      })
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });

  it('should have an id and name property for each item in the list', function(done) {
    request(app)
      .get('/drinks')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.id = res.id;
        if (!('id' in res.body[0])) {
          throw new Error("response elements do not have an id property");
        }
      })
      .expect(function(res) {
        if (!('name' in res.body[0])) {
          throw new Error("response elements do not have a name property");
        }
      })
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /randomDrinks', function(){
  it('should respond with a status of 200', function (done) {
    request(app)
      .get('/randomDrinks')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        console.log(err);
        done();
      });
  });

  it('should respond with one random drink object', function (done) {
    request(app)
      .get('/randomDrinks')
      .set('Accept', 'application/json')
      .expect(function (res) {
        if (typeof res.body === "object" && Array.isArray(res.body)) {
          throw new Error('response should be a single object');
        }
      })
      .expect(function (res) {
        if (!('id' in res.body)) {
          throw new Error('response does not have an id property');
        }
      })
      .expect(function (res) {
        if (!('name' in res.body)) {
          throw new Error('response does not have an name property');
        }
      })
      .end(function (err, res) {
        if (err) return done(err);
        console.log(err);
        done();
      });
  });
});
