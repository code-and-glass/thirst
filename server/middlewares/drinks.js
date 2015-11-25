//handles sending data about drinks to be rendered on client
var drinks = require('../models/drinks.js');
var express = require('express');
var router = express.Router();
var request = require('supertest');
var app = express();

/*
{ 
  user: token123124123123123122,
  drinksNotRated : [x, y, z]
  drinksRecommended: [x, y, z]
  drinksRated: [x, y,z]
}
*/

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home/login page
  res.redirect('/login');
}

app.get('/drinks', function(req, res, next) {
  //respond with data of all drinks in db
  // console.log(req.body);
  drinks.getAllDrinks(function(results) {
    // console.log('results from router.get callback', results);
    var testJSON = {'results':results};
    res.json(testJSON);
  });
});

app.get('/drinks/randomDrinks', function(req, res, next) {
  //respond with data of all drinks in db
   drinks.getRandomDrinks(function(results) {
    // console.log('results length from router.get callback', results);
    var drinks = {results: results};
    console.log(drinks);
    
    res.send(drinks);
  });
});

// request(app)
//   .get('/drinks/randomDrinks')
//   .expect(200)
//   .expect('Content-Type', /json/)
//   .end(function(err, res){
//     if (err) throw err;

//      // console.log(res);
//   });

module.exports = app;