var Drink = function(name) { //additional parameters and object properties as needed
  //create drink node
  return {
    drinkName: name,
  };
};

module.exports = {

  saveDrink:function(drinkName) {
    //save drink to db
  },
  
  getDrink: function(drinkName) {
    //return drink node by drinkName property
    var predicate = {drinkName: drinkName};
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

  getAllDrinks: function() {
    //return all drinks in db
  },

  getRatedUsers: function(drinkName) {
    //return users who rated this drink, in order of rating
  }



  
};