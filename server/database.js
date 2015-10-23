var recommend = require('./recommender.js');
var utils = require('./utilities/utils');
var db = require('./serverConfig.js');

// module.exports = function() {
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
