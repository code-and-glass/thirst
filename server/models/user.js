var db;
var Drink = require('./drinks.js');
if (process.env.GRAPHENEDB_URL){

  var url = require('url').parse(process.env.GRAPHENEDB_URL);

  db = require("seraph")({
    server: url.protocol + '//' + url.host,
    user: url.auth.split(':')[0],
    pass: url.auth.split(':')[1]
  });
} else {
  var config = require('../../config.js');
  db = require("seraph")({
    server: "http://localhost:7474",
    user: config.neo4jAuth.user,
    pass: config.neo4jAuth.password //your password here
  });  
}

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
    
     db.save(user, function(err, user){
       db.label(user, 'User', function(err) {
        if (err) throw err;
        console.log(user.userName + ' saved to database and labeled.');
        //get all drinks and create relationship with 0 rating.
        require('./drinks.js').getAllDrinks(function(results) {
          results.forEach(function(drink) {
            function getRandomInt(min, max) {
              return Math.floor(Math.random() * (max - min)) + min;}
            var rating = getRandomInt(1,5);
            db.relate(user, 'RATED', drink, {rating:rating}, 
            function(err, relationship) {
              if (err) console.log(err);
            });
          });
        });
      }
    );
  });
},

  getUser: function(name, callback) {
    //get user node by name
   
    var predicate = {userName: name};
    db.find(predicate, function(err, result) { 
    //may need to account for result being array of 1
      if (err) throw err;
      callback(result); 
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
      if (err) throw err;
       callback(relationships);
    });
  },
  
  getUserLikes: function(user, rating) {
   //return a list of drink nodes which a user has rated at least [rating]
   var allLikes = getAllUserLikes(user);
   //filter all liked drinks by reading relationships
   allLikes
     .filter(
     function(drink) {
       return drink.rating >= rating;
    });
  },

  rate: function(user, rating, drink, callback) {
    return db
      .relate(user, 'RATED', drink, {rating:rating, user:user.userName, drink:drink.name }, function(err, relationship) {
      console.log('rate callback triggered');
      if (callback) {
        callback(relationship);
      }
    });
  },

  query: function(cypher, user, callback) {
    return db.query(cypher, user, function(err,results) {
      if (err) console.log(err);

      callback(results); 
    });
  }
};