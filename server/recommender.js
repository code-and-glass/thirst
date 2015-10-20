
var Recommender = require('likely');


module.exports.model = function(matrix, rowLabels, colLabels) {
   return Recommender.buildModel(matrix, rowLabels, colLabels);
};

// //Retrieve a list of all items not already rated by a user, sorted by estimated ratings using labels.
module.exports.recommendations = function(user) {
  return model.recommendations(user); 
};

// //Retrieve a list of all items not already rated by a user, sorted by estimated ratings without labels.
module.exports.recommendations = function() {
  return model.recommendations(0);
};

// //Retrieve a list of all items, sorted by the ratings for a given user (both estimated and actual), using labels.
module.exports.allItems = function(user) {
  return model.rankAllItems(user);
};

// //Retrieve a list of all items, sorted by the ratings for a given user (both estimated and actual) without labels.
// //var allItems = model.rankAllItems(0);

// //BIAS HANDLING

// //var bias = Recommender.calculateBias(input);

// // Build the model using the training set and considering the bias
// //var model = Recommender.buildModelWithBias(trainingSet, bias);

// console.log(allItems);
