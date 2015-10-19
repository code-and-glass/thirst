var db = require('seraph');

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
    db.save(user, function(err, user){
      if (err) {
        throw err;
      } else {
      console.log(user.userName + ' saved to database.');
      }
    });
  },

  getUser: function(name) {
    //get user node by name
    var predicate = {username: name};
    return db.find(predicate, function(err, result) { 
    //may need to account for result being array of 1
      if (err) {
        throw err;
      } else {
        //may return undefined or similar if no user
        return result; 
      }
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