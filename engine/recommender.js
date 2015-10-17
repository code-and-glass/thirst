var Recommender = require('likely');
var matrix = require('../app.js');
console.log(matrix).resultMatrix;
var inputMatrix = [ [ 5, 5, 5, 5 ], //
                    [ 5, 5, 5, 5 ],
                    [ 5, 5, 5, 5 ]
                  ];

var rowLabels = ['John', 'Sue', 'Joe', 'suss']; //users
var colLabels = ['vodka', 'water', 'absinthe', 'maple syrup']; //items

var model = Recommender.buildModel(matrix, rowLabels, colLabels);


//Retrieve a list of all items not already rated by a user, sorted by estimated ratings using labels.
var recommendations = model.recommendations('john'); 

//Retrieve a list of all items not already rated by a user, sorted by estimated ratings without labels.
//recommendations = model.recommendations(0);

//Retrieve a list of all items, sorted by the ratings for a given user (both estimated and actual), using labels.
var allItems = model.rankAllItems('John');

//Retrieve a list of all items, sorted by the ratings for a given user (both estimated and actual) without labels.
//var allItems = model.rankAllItems(0);

//BIAS HANDLING

//var bias = Recommender.calculateBias(input);

// Build the model using the training set and considering the bias
//var model = Recommender.buildModelWithBias(trainingSet, bias);

console.log(allItems);





