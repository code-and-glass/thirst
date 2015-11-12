var drinks = require('../models/drinks.js');
var express = require('express');
var router = express.Router();
var request = require('supertest');
var app = express();
var User = require('../models/user.js');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home/login page
  res.redirect('/login');
}

app.get('/drinks/ratedDrinks', function(req, res, next) {
  //respond with data of all drinks in db
  console.log("req.cookie", req.cookie);
  console.log("req.session", req.session);
   var id = req.sessionStore.googleId;
   User.getUser({googleId: id}, function(err, user) {
     if (err) throw err;
     var cypher = "MATCH (b:User {googleId: 'KEY'})-[r:RATED]->(m:Drink)\n"+
                  //"WHERE  ((b)-[:RATED]->(m))\n"+
                  "RETURN m,r";
     cypher = cypher.replace('KEY', id);
     console.log(cypher);
     User.query(cypher, null, function(results) {       
       responseData = {};
       console.log(results);
       responseData.results = results.map(function(item) {
        return { name: item.m.name, id: item.m.id, rating: item.r.properties.rating};
      });
      console.log(responseData);
      res.send(responseData);
     });
  });
});

module.exports = app;
