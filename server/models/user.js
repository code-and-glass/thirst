var db = require('../serverConfig.js');
var Drink = require('./drinks.js');

//Checks if deployed or local


//NEEDS TESTS

var User = function(name, password, email) {
  //create user node
  return {
    userName: name,
    email: email,
    password: password
  };
};

//example usage: db.save(user('fred', 'secret'));

module.exports = {
  saveUser: function(user) {
    //save user node to db
    console.log('saveUser triggered');
     db.save(user, function(err, user){
      console.log('db.save triggered');
      db.label(user, 'User', function(err) {
        if (err) throw err;
        console.log(user.userName + ' saved to database and labeled.');
        //get all drinks and create relationship with 0 rating.
        require('./drinks.js').getAllDrinks(function(results) {
          results.forEach(function(drink) {
          db.relate(user, 'likes', drink, {rating:0, user:user.userName, drink:drink.drinkName }, 
            function(err, relationship) {
              if (err) throw err;
            });
          });
        });
      }
    );
  });
},

  getUser: function(name, callback) {
    //get user node by name
    console.log('getUser triggered');
    var predicate = {userName: name};
    db.find(predicate, function(err, result) { 
    //may need to account for result being array of 1
    console.log('db.find triggered');
      if (err) {
        throw err;
      } else {
        //console.log(result);//may return undefined or similar if no user
        callback(result); 
      }
    });
  },

  getAllUsers: function(callback) {
    //return array of all users in database.
    return db.nodesWithLabel('User', function(err, results) {
      
      callback(results);
    });
  },

  getAllUserLikes: function(user, callback) { 
    //user should be a node in db with id property
    //return a list of drink nodes that a user has rated
    return db.relationships(user, 'out', 'likes', function(err, relationships) {
      if (err) {
        throw err;
      } else {
        callback(relationships);
      }
    });

    // var cypherQuery = "START a=node(*) "
    //                 + "MATCH (a)-[:likes*]->(d) "
    //                 + "RETURN distinct d";
    // db.queryRaw(cypherQuery, user, function(err, result) {
    //     if (err) console.log( err );
    //     callback(result);
    // });
  },
  
  getUserLikes: function(user, rating) {
   //return a list of drink nodes which a user has rated at least [rating]
   var allLikes = getAllUserLikes(user);
   //somehow filter all liked drinks by reading relationships
   allLikes.filter(
    function(drink) {
      return drink.rating >= rating;
    });
  },

  rate: function(user, rating, drink, callback) {
    db.relate(user, 'likes', drink, {rating:rating, user:user.userName, drink:drink.drinkName }, function(err, relationship) {
      console.log('rate callback triggered');
      callback(relationship);
    });
  }
};