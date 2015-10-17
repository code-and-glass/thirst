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
