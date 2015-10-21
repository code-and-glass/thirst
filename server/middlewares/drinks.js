//handles sending data about drinks to be rendered on client
var drinks = require('../models/drinks.js');
var express = require('express');
var router = express.Router();
var request = require('supertest');
var app = express();

/* GET home page. */
app.get('/drinks', function(req, res, next) {
  //respond with data of all drinks in db
   drinks.getAllDrinks(function(results) {
    console.log('results from router.get callback', results);
    //console.log(results);
     var testJSON = {'results':results};
     res.json(testJSON);
     //res.send({ message: 'hey' });
  });
  //console.log(res);
  //console.log('adf');
});

//test
request(app)
  .get('/drinks')
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function(err, res){
    if (err) throw err;
    //console.log(res);
  });

module.exports = app;