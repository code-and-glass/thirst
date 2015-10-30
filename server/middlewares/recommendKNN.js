var Drink = require('../models/drinks.js');
var User = require('../models/user.js');
var express = require('express');
// var router = express.Router();
var request = require('supertest');
var app = express();
var utils = require('../utilities/utils.js');
var db = require('seraph');


app.get('/recommendKNN', function(req, res, next) {

  //save test drink nodes
  // for (i = 1; i < 11; i++) {
  //     var drink = 'drink' + i;
  //     Drink.saveDrink({drinkName: drink});
  //   }
  // //save test user nodes 
  // for (var i = 1; i < 11; i++) {
  //     var name = 'user' + i;
  //     User.saveUser({userName: name});
  //   }

  //console.log('test db populated.');

  //use db.queryraw to query db with cypher and retrieve relations

  //cosine similarity cypher query
  
  // var user = req.user;
  var user = {userName: 'user6'};
  var cosSim = 
            "MATCH (p1:User)-[x:RATED]->(m:Drink)<-[y:RATED]-(p2:User)\n" +
            "WITH  SUM(x.rating * y.rating) AS xyDotProduct,\n" +
            "SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.rating) | xDot + a^2)) AS xLength,\n" +
            "SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.rating) | yDot + b^2)) AS yLength,\n" +
            "p1, p2\n" +
            "MERGE (p1)-[s:SIMILARITY]-(p2)\n" +
            "SET   s.similarity = xyDotProduct / (xLength * yLength)";

  //N nearest neighbors
  var nNeighbors = 
            "MATCH    (p1:User {name:'user1'})-[s:SIMILARITY]-(p2:User)\n" +
            "WITH     p2, s.similarity AS sim\n" +
            "ORDER BY sim DESC\n" +
            "LIMIT    5\n" +
            "RETURN   p2.name AS Neighbor, sim AS Similarity\n";

  //get movie recommendation for a user
  var recommendations = 
            "MATCH    (b:User)-[r:RATED]->(m:Drink), (b)-[s:SIMILARITY]-(a:User {userName: 'user6'})\n" +
            "WHERE     ((a)-[:RATED]->(m))\n" +
            "WITH     m, s.similarity AS similarity, r.rating AS rating\n" +
            "ORDER BY m.drinkName, similarity DESC\n" +
            "WITH     m.drinkName AS drink, COLLECT(rating)[0..3] AS ratings\n" +
            "WITH     drink, REDUCE(s = 0, i IN ratings | s + i)*1.0 / LENGTH(ratings) AS reco\n" +
            "ORDER BY reco DESC\n" +
            "RETURN   drink AS Drink, reco AS Predicted";
  
  
  // User.query(cosSim, null, function(results) {
  //   if (err) console.log(err);
  //   console.log('Graph cosine similarities updated');
  // });
  
  User.query(recommendations, null, function(results) {
    // if (err) throw err;
    // console.log(results);
    var recommended = {results:results};
    res.send(recommended);
  });
  //res.sendStatus(200);
});

module.exports = app;



//test

request(app)
  .get('/recommendKNN')
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function(err, res){
    //if (err) throw err;
    
    console.log(res.body.results);
  });
