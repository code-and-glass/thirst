var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require("request");
var assert = require('assert');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


/********************* start neo4j ***************************/
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

  var config = require('./config.js');
  db = require("seraph")({server: "http://localhost:7474",
                            user: config.neo4jAuth.user,
                            pass: config.neo4jAuth.password //your password here
                          });  
}

// db.save({ name: "Artem"}, function(err, node) {
//   if (err) throw err;
//   console.log("new user Artem added to db");

//   // db.delete(node, function(err) {
//   //   if (err) throw err;
//   //   console.log("Test-Man away!");
//   // });
// });
var array = [];
var resultMatrix;
var read = function(err, relationship) {
 db.rel.read(relationship.id, function(err, readRelationship) {
    var rating = readRelationship.properties.rating;
    console.log(rating);
    array.push(rating);
    console.log(array);
  });
};

var write = function(err, relationship) {
 db.rel.read(relationship.id, function(err, readRelationship) {
    var rating = readRelationship.properties.rating;
    console.log(rating);
    array.push(rating);
    console.log(array);
    resultMatrix = listToMatrix(array, 4);
    console.log(resultMatrix);

  });
};

var listToMatrix= function(list, elementsPerSubArray) {
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

db.batch(function(txn) {

var user1 = txn.save({name: 'Artem'});
var user2 = txn.save({name: 'Ben'});
var user3 = txn.save({name: 'Victoria'});
var user4 = txn.save({name: 'Igor'});

var likedDrinks = txn.save([
  { drinkName: 'maple syrup'},
  { drinkName: 'blood of my enemies'},
  { drinkName: 'Dihydrogen Monoxide'},
  { drinkName: 'liquid cocaine'}
]);

txn.relate(user1, 'likes', likedDrinks[1], {rating: '5'}, read);
txn.relate(user1, 'likes', likedDrinks[2], {rating: '1'}, read);
txn.relate(user1, 'likes', likedDrinks[0], {rating: '3'}, read);
txn.relate(user1, 'likes', likedDrinks[3], {rating: '3'}, read);

txn.relate(user2, 'likes', likedDrinks[1], {rating: '2'}, read);
txn.relate(user2, 'likes', likedDrinks[2], {rating: '5'}, read);
txn.relate(user2, 'likes', likedDrinks[0], {rating: '3'}, read);
txn.relate(user2, 'likes', likedDrinks[3], {rating: '4'}, read);

txn.relate(user3, 'likes', likedDrinks[1], {rating: '5'}, read);
txn.relate(user3, 'likes', likedDrinks[2], {rating: '4'}, read);
txn.relate(user3, 'likes', likedDrinks[0], {rating: '1'}, read);
txn.relate(user3, 'likes', likedDrinks[3], {rating: '2'}, read);

txn.relate(user4, 'likes', likedDrinks[1], {rating: '3'}, read);
txn.relate(user4, 'likes', likedDrinks[2], {rating: '3'}, read);
txn.relate(user4, 'likes', likedDrinks[0], {rating: '3'}, read);
txn.relate(user4, 'likes', likedDrinks[3], {rating: '1'}, write);
},
function(err, results) {
  console.log(results);
  console.log(array);
  console.log('user drink likes committed');
  console.log('matrix');
  console.log(listToMatrix(array, 4));
});


// MIGRATION
// var neo4jUrl = ("http://localhost:7474") + "/db/data/transaction/commit";

// function cypher(query,params,cb) {
//   request.post({uri:neo4jUrl,
//           json:{statements:[{statement:query,parameters:params}]}},
//     function(err,res) { 
//       console.log('error in post');
//       cb(err,res.body);
//   });
// }

// var query="WITH {json} AS document UNWIND document.categories AS category MERGE (:CrimeCategory {name: category.name}) "; //to be changed

// var apiUrl = "https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a";

// request.get({url:apiUrl,json:true,gzip:true}, function(err,res,json) {
//   cypher(query,{json:json},function(err, result) { 
//     console.log('error in get');
//     console.log(err, JSON.stringify(result));});
// });

/************************* end neo4j***********************/

// ***************** absolutAuth Req Used to retrieve data and save to db  ****************/
//
// uncomment only to request data from absolut api
//
// can only get 25 at a time, the json object has a "next" property that records where
// it left off, defaults to 25
// 
// var request = require('request');
// var fs = require('fs');
// var absolutEndPoint = 'https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a&pageSize=100';

// request(absolutEndPoint, function (error, response, json) {
//   console.log(JSON.stringify(json));
//   fs.writeFile('./data.json', json, function(err) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("JSON saved to " + './data.json');
//     }
//   }); 
// });
// ** use http://jsonprettyprint.com/
// ** to prety print the json file and export to add to neo4j
// ** I copied the pretty print into allDrinksTo25.js
/******************** end absolutAuth ********************/

/******************** start adding data to neo4j ********************/
/* <------------------ uncomment to save drink data (without conflict from above)
//config.js contains user/password for neo4j
var config = require('./config.js'); 
// allDrinkTo25 contains stored "prettyified" json responses from api request
var data = require('./allDrinksTo25.js'); 
// authenticate neo4j
var db = require("seraph")({server: "http://localhost:7474",
                            user: config.neo4jAuth.user,
                            pass: config.neo4jAuth.password //your password here
                          });
//this function connects nodes to ingredients and properties
function createRelationship(nodeId, obj, rel) {
  var key;
  var nodeID;
  for (var prop in obj) {
    key = prop;
  }
  db.save({
    id: obj[key],
    key: obj[key]
  }, function (err, node) {
    if (err) console.log("error inside doesExist", err);
    db.relate(nodeId, rel, node.id, function (err, node) {
      if (err) console.log("error inside relate", err);
      console.log("relate saved", node);
    });
  });
}
// this iterates over each drink
for (var i = 0; i < data.result.length; i++) {
  var nodeid;
  var color = data.result[i].color;
  var isAlcoholic = data.result[i].isAlcoholic;
  var isCarbonated = data.result[i].isCarbonated;
  var isHot = data.result[i].isHot;
  var ingredients = data.result[i].ingredients;
  var tastes = data.result[i].tastes;
  //each drink has it's own node (id)
  db.save({
    id: data.result[i].id,
    name: data.result[i].name
  }, function (err, node) {
    if (err) console.log("err inside db.save",err);
    nodeid = node.id;
    console.log("node saved", node);
    // build relationships between drink nodes and general properties
    createRelationship(nodeid, {color: color}, "hasColor");
    if (isAlcoholic) {
      createRelationship(nodeid, {isAlcoholic: isAlcoholic}, "hasAlcohol");
    }
    if (isCarbonated) {
      createRelationship(nodeid, {isCarbonated: isCarbonated}, "hasCarbonation");
    }
    if (isHot) {
      createRelationship(nodeid, {isHot: isHot}, "hot");
    }
    // iterates over array of taste objects
    for (var n = 0; n < tastes.length; n++) {
      var  tasteid;
      db.save({
        id: tastes[n].id,
        text: tastes[n].textPlain
      }, function (err, node) {
        if (err) throw err;
        tasteid = node.id;
        createRelationship(nodeid, tasteid, "hasIngredient");
      });
    }
    // iterates over array of ingredient objects
    for (var j = 0; j < ingredients.length; j++) {
      var ingredientid;
      db.save({
        id: ingredients[j].id,
        type: ingredients[j].type,
        text: ingredients[j].textPlain,
      }, function (err, node) {
        if (err) throw err;
        ingredientid = node.id;
        createRelationship(nodeid, ingredientid, "hasIngredient");
      });
    }
  });
}
*///<----------------------- uncomment here
/******************** end seraph/neo4j ********************/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
