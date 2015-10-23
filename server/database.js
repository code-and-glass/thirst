var recommend = require('./recommender.js');
var utils = require('./utilities/utils');
var db = require('./config.js');

// module.exports = function() {
var db;
var Users = require('./models/user.js');

//Checks if deployed or local
if (process.env.GRAPHENEDB_URL){

  var url = require('url').parse(process.env.GRAPHENEDB_URL);

  db = require("seraph")({
    server: url.protocol + '//' + url.host,
    user: url.auth.split(':')[0],
    pass: url.auth.split(':')[1]
  });
} else {
  var config = require('../config.js');
  db = require("seraph")({
    server: "http://localhost:7474",
    user: config.neo4jAuth.user,
    pass: config.neo4jAuth.password //your password here
  });  
}

module.exports = db;



  // var array = [];
  // var matrix = [];
  // var batchingDone = false;
  
  

  
//    var read = function(err, relationship) {
//    db.rel.read(relationship.id, function(err, readRelationship) {
//       var rating = readRelationship.properties.rating;
//       console.log(rating);
//       //array.push(rating);
//       //console.log(array);
//     });
//   };

//   var write = function(err, relationship) {
//  db.rel.read(relationship.id, function(err, readRelationship) {
//     var rating = readRelationship.properties.rating;
//     console.log(rating);
//     array.push(rating);
//     console.log(array);
//     resultMatrix = listToMatrix(array, 4);
//     console.log(resultMatrix);

//   });
// };

var listToMatrix = function(list, elementsPerSubArray) {
  var matrix = [], i, k;
  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
};

  // var artem ={userName: 'Artem'};
  // db.save({name: 'Artem'}, function(err, user) {
  //   if (err) {throw err;}
  //   console.log('Artem saved to neo4j with db.save');
  // });
  // console.log('--------------');
  // Users.saveUser(artem);
  // console.log('--------------');

  db.batch(function(txn) {
    console.log('batch start');
  
  var user1 = txn.save({name: 'Am'});
  var user2 = txn.save({name: 'Ben'});
  var user3 = txn.save({name: 'Victoria'});
  var user4 = txn.save({name: 'Igor'});

  var likedDrinks = txn.save([
    { drinkName: 'maple syrup'},
    { drinkName: 'blood of my enemies'},
    { drinkName: 'Dihydrogen Monoxide'},
    { drinkName: 'liquid cocaine'}
  ]);

  txn.relate(user1, 'likes', likedDrinks[1], {rating: '5'});
  txn.relate(user1, 'likes', likedDrinks[2], {rating: '1'});
  txn.relate(user1, 'likes', likedDrinks[0], {rating: '3'});
  txn.relate(user1, 'likes', likedDrinks[3], {rating: '3'});

  txn.relate(user2, 'likes', likedDrinks[1], {rating: '2'});
  txn.relate(user2, 'likes', likedDrinks[2], {rating: '5'});
  txn.relate(user2, 'likes', likedDrinks[0], {rating: '3'});
  txn.relate(user2, 'likes', likedDrinks[3], {rating: '4'});

  txn.relate(user3, 'likes', likedDrinks[1], {rating: '5'});
  txn.relate(user3, 'likes', likedDrinks[2], {rating: '4'});
  txn.relate(user3, 'likes', likedDrinks[0], {rating: '1'});
  txn.relate(user3, 'likes', likedDrinks[3], {rating: '2'});

  txn.relate(user4, 'likes', likedDrinks[1], {rating: '3'});
  txn.relate(user4, 'likes', likedDrinks[2], {rating: '3'});
  txn.relate(user4, 'likes', likedDrinks[0], {rating: '3'});
  txn.relate(user4, 'likes', likedDrinks[3], {rating: '1'});

  batchingDone = ('batching done');
  
  
  },
  
  function(err, results) {
    
    console.log(results);
    var array = [];
    results.forEach(function(node) {
      if (node.type && node.type === 'likes') {
        array.push(node.properties.rating);
      }
    });
    var resultsMatrix = utils.listToMatrix(array, 4);
    
    // console.log('batching committed');
     
    var rowLabels = ['Artem', 'Ben', 'Victoria', 'Igor']; 
    var colLabels = ['blood of my enemies', 'Dihydrogen Monoxide', 'maple syrup', 'liquid cocaine'];
    var model = recommend.model(resultsMatrix, rowLabels, colLabels);
     //console.log(resultsMatrix);
    var rankings = model.rankAllItems('Victoria');
    console.log(rankings);
    //callback(rankings);
  
  });
// };





