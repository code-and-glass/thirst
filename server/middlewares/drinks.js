//handles sending data about drinks to be rendered on client
var drinks = require('../models/drinks.js');
var express = require('express');
var router = express.Router();
// var request = require('supertest');
var app = express();


/* GET home page. */
app.get('/drinks', function(req, res, next) {
  //respond with data of all drinks in db
   drinks.getAllDrinks(function(results) {
    // console.log('results from router.get callback', results.length);
     var testJSON = {'results':results};
     // console.log('THIS IS THE JSON');
     // console.log(testJSON);
     res.send(results);
     //res.send({ message: 'hey' });
  });
  //console.log(res);
  //console.log('adf');
});

//test
// request(app)
//   .get('/drinks')
//   .expect(200)
//   .expect('Content-Type', /json/)
//   .end(function(err, res){
//     if (err) throw err;
//     console.log(res);
//   });


app.get('/randomDrinks', function(req, res, next) {
  //respond with data of all drinks in db
   drinks.getRandomDrinks(function(results) {
    // console.log('results length from router.get callback', results);
    res.send(results);
  });
});

module.exports = app;