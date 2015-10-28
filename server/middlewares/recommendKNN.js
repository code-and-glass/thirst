var Drink = require('../models/drinks.js');
var User = require('../models/user.js');
var express = require('express');
var router = express.Router();
var request = require('supertest');
var app = express();
var utils = require('../utilities/utils.js');
var db = require('seraph');


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

app.get('/recommendKNN', function(req, res, next) {

  //save test drink nodes
  for (i = 1; i < 101; i++) {
      var drink = 'drink' + i;
      Drink.saveDrink({drinkName: drink});
    }
  //save test user nodes 
  for (var i = 1; i < 101; i++) {
      var name = 'user' + i;
      User.saveUser({userName: name});
    }

  console.log('test db populated.');

  //use db.queryraw to query db with cypher and retrieve relations

  //cosine similarity cypher query
  cosSim = "MATCH (p1:User)-[x:RATED]->(m:Drink)<-[y:RATED]-(p2:User) " +
           "WITH  SUM(x.rating * y.rating) AS xyDotProduct," +
           "SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.rating) | xDot + a^2)) AS xLength," +
           "SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.rating) | yDot + b^2)) AS yLength," +
           "p1, p2 " +
           "MERGE (p1)-[s:SIMILARITY]-(p2) " +
           "SET   s.similarity = xyDotProduct / (xLength * yLength)";

  //N nearest neighbors
  nNeighbors = "MATCH    (p1:User {name:'user1'})-[s:SIMILARITY]-(p2:Person) " +
                "WITH     p2, s.similarity AS sim " +
                "ORDER BY sim DESC" +
                "LIMIT    5" +
                "RETURN   p2.name AS Neighbor, sim AS Similarity";

  //get movie recommendation for a user

  recommendations = "MATCH    (b:User)-[r:RATED]->(m:Drink), (b)-[s:SIMILARITY]-(a:Person {name:'user2'})" +
                    "WHERE    NOT((a)-[:RATED]->(m))" +
                    "WITH     m, s.similarity AS similarity, r.rating AS rating" +
                    "ORDER BY m.name, similarity DESC" +
                    "WITH     m.name AS drink, COLLECT(rating)[0..3] AS ratings" +
                    "WITH     drink, REDUCE(s = 0, i IN ratings | s + i)*1.0 / LENGTH(ratings) AS reco" +
                    "ORDER BY reco DESC" +
                    "RETURN   drink AS Drink, reco AS Recommendation";
  
  User.query((cosSim + nNeighbors + recommendations), {id: 3}, function(err, result) {
    if (err) console.log( err );
    //console.log(result);
  });
});






//test

request(app)
  .get('/recommendKNN')
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function(err, res){
    if (err) { 
      console.log(err);
    }
    //console.log(res);
  });
