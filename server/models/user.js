var db;

//Checks if deployed or local
if(process.env.GRAPHENEDB_URL){

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
    //var db = require('seraph');
    //save user node to db
    console.log('saveUser triggered');
     db.save(user, function(err, user){
      console.log('db.save triggered');
      db.label(user, 'User', function(err) {
        if (err) {
          throw err;
        } else {
        console.log(user.userName + ' saved to database and labeled.');

        }
      });
    });
  },

  getUser: function(name) {
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
        return result; 
      }
    });
  },

  getAllUsers: function() {
    //return array of all drinks in database.
    return db.nodesWithLabel('User', function(err, results) {
      return results;
    });
  },

  getAllUserLikes: function(user) { 
    //user should be a node in db with id property
    //return a list of drink nodes that a user has rated
    return db.relationship(user, 'out', 'likes', function(err, relationships) {
      if (err) {
        throw err;
      } else {
        return relationships;
      }
    });
  },
  
  getUserLikes: function(user, rating) {
   //return a list of drink nodes which a user has rated at least [rating]
   var allLikes = getAllUserLikes(user);
   //somehow filter all liked drinks by reading relationships
   allLikes.filter(
    function(drink) {
      return drink.rating > rating;
    });
  }
};