//when a user rates a drink, the rating is stored as a relationship
//and the recommendations for all users are updated
var Drink = require('../models/drinks.js');
var User = require('../models/user.js');
var express = require('express');
var router = express.Router();
var request = require('supertest');
var app = express();
var utils = require('../utilities/utils.js');
var recommend = require('../recommender.js');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home/login page
  res.redirect('/login');
}

app.post('/rate', function(req, res, next) {
  //post rating to drink
  // console.log("request session in rate", req.session.passport.user);
  var id = req.session.passport.user.id;
  var rating = req.body.rating;
  var drinkName = req.body.drink;
  // console.log(drinkName);
  Drink.getDrink(drinkName, function (drinkNode) {
    // console.log("drinkNode is ", drinkNode);
    User.getUser({googleId: id}, function (err, result) {
      console.log("after get user", result);
      User.rate(result[0], rating, drinkNode, function(err, results) {
        console.log('results from app.get callback', results);
        if (err) console.log(err);
        res.sendStatus(200);
      });
    });
  });
});

/*

app.get('/recommend', function(req, res, next) {
  //get a list of all user and ratings
//   User.saveUser({userName: 'JACKIECHAN'});
//   User.saveUser({userName: 'JIMMYCHAN'});
    //
   for (var i = 1; i < 1001; i++) {
    var name = 'user' + i;
    User.saveUser({userName: name});
  }
  //save all drinks
  //save alot of users.
  User.getAllUsers(function(result) {

   //console.log(result);
  //read all relationships
   //set some relationships
   var userLabels = [];
   var drinkLabels = {};
   var matrix =[];
   var ratings = [];
   var count = 0;


   result.forEach( function(user) {
         //console.log(user);
         userLabels.push(user.userName);
     User.getAllUserLikes(user, function(likedDrinks) {
       //console.log(likedDrinks);
       likedDrinks.forEach(function(item){
         //console.log(likedDrinks);
         //console.log(item.properties.drink);
         drinkLabels[item.properties.drink] = item.properties.drink;
         ratings.push(item.properties.rating);
       });
       matrix.push(ratings);
       count++;
       if (count === result.length) {
         console.log(userLabels);
         drinks = Object.keys(drinkLabels);
         //take the matrix, run recommend
         var model = recommend.model(matrix, userLabels, drinks);
         var results = model.recommendations('user2');
         //res.json {recommendations: []};
         console.log(results);
         res.json({recommendations: results});
         }
      });
    });
  });
  //starts out at matrix 0 length,
  //add a user , matrix 1
  // });
  //find user name from start property, dirnk name form end property, and rating
    //create matrix somehow and fetch recommendations

});
*/
//test
// request(app)
//   .post('/rate')
//   .expect(200)
//   .expect('Content-Type', /json/)
//   .end(function(err, res){
//     if (err) throw err;
//     //console.log(res);
//   });


  // request(app)
  // .get('/recommend')
  // .expect(200)
  // .expect('Content-Type', /json/)
  // .end(function(err, res){
  //   if (err) console.log(err);
  //   //console.log(res);
  // });

module.exports = app;
