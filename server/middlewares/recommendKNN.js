  var Drink = require('../models/drinks.js');
var User = require('../models/user.js');
var express = require('express');
// var router = express.Router();
var request = require('supertest');
var app = express();
var utils = require('../utilities/utils.js');
var db = require('seraph');


app.get('/recommendKNN', function(req, res, next) {

  //#########FOR TESTING ONLY. Populates db with dummy user and drink nodes.##########
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
  //###################################################################################


  //use db.queryraw to query db with cypher and retrieve relations

  //get username and stringify to be passed into cypher query
  // var user =    "'" + req.session.userRecord.userName + "'" ;
  var id = req.sessionStore.googleId;
  User.getUser({googleId: id}, function(err, node) {

    var user =    "'" + node[0].googleId + "'";
    console.log("This is var user:" , user);

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
    var recommendString =
            "MATCH    (b:User)-[r:RATED]->(m:Drink), (b)-[s:SIMILARITY]-(a:User {googleId: KEY})\n" +
            "WHERE NOT ((a)-[:RATED]->(m))\n" +
            "WITH     m, s.similarity AS similarity, r.rating AS rating\n" +
            "ORDER BY m.name, similarity DESC\n" +
            "WITH     m.name AS drink, COLLECT(rating)[0..3] AS ratings\n" +
            "WITH     drink, REDUCE(s = 0, i IN ratings | s + i)*1.0 / LENGTH(ratings) AS reco\n" +
            "ORDER BY reco DESC\n" +
            "RETURN   drink AS name, reco AS Predicted";


  //place cypher current request's userName into cypher query
    recommendations = recommendString.replace('KEY', user);

  // User.query(cosSim, null, function(results) {
  //   if (err) console.log(err);
  //   console.log('Graph cosine similarities updated');
  // });

    User.query(cosSim, null, function(results) {
      User.query(recommendations, null, function(results) {
        var recommended = {results:results};
        console.log("Recommended" , recommended);
        res.send(recommended);
      });
    });
  });
});

module.exports = app;



// test

// request(app)
//   .get('/recommendKNN')
//   .expect(200)
//   .expect('Content-Type', /json/)
//   .end(function(err, res){
//     //if (err) throw err;

//     console.log(res.body.results);
//   });
