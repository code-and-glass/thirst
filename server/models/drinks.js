var db = require('../serverConfig.js');

var Drink = function(name) { //additional parameters and object properties as needed
  //create drink node
  return {
    drinkName: name
    //etc
  };
};

module.exports = {

  saveDrink:function(drink) {
    db.save(drink, function(err, drink){
      db.label(drink.id, 'Drink', function(err) {
        if (err) {
          throw err;
        } else {
        console.log(drink.name + ' saved to database and labeled.');
        }
      });
    });
  },
  
  getDrink: function(drinkName, callback) {
    //return drink node by drinkName property
    var predicate = {name: drinkName};
    return db.find(predicate, function(err, result) { 
    //may need to account for result being array of 1
      if (err) {
        throw err;
      } else {
        //may return undefined or similar if no user
        callback(result); 
      }
    });
  },

  getAllDrinks: function(callback) {
    //return array of ten drinks starting at random index
    return db.nodesWithLabel('Drink', function(err, results) {
      //console.log('results from getAllDrinks callback', results);
      //sends one random drink
      callback(results);
    });
  },

  getRandomDrinks: function(callback) {
    // gets 10 drinks starting at random index
    return db.nodesWithLabel('Drink', function(err, results) {
      var randomNum = Math.floor(Math.random() * (results.length - 10));
      var randomList = results.slice(randomNum, randomNum+10);
      // sends one random drink
      callback(randomList);
    });
  },

  getRatedUsers: function(drink) {
    //return users who rated this drink
    //drink is a node
    return db.relationship(drink, 'in', 'likes', function(err, relationships) {
      if (err) {
        throw err;
      } else {
        return relationships;
      }
    });
  }
};