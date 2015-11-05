var drinks = require('../models/drinks.js');
var express = require('express');
var router = express.Router();
var request = require('supertest');
var app = express();
var User = require('../models/user.js');
app.get('/drinks/ratedDrinks', function(req, res, next) {
  //respond with data of all drinks in db
   var id = req.sessionStore.googleId;

   console.log("got to server");
   console.log("id:", id);
   console.log(req.sessionStore);


   User.getUser({googleId: id}, function(err, user) {
     if (err) throw err;
     var cypher = "MATCH (b:User {googleId: 'KEY'})-[r:RATED]->(m:Drink)\n"+
                  "WHERE  ((b)-[:RATED]->(m))\n"+
                  "RETURN m,r";
     cypher = cypher.replace('KEY', id);
     User.query(cypher, null, function(results) {
       console.log(results);
       res.send(results);
     });
  });
});

module.exports = app;
