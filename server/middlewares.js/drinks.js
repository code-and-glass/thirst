//handles sending data about drinks to be rendered on client
var drinks = require('../models/drinks.js');
var express = require('express');
var router = express.Router();
var request = require('supertest');

/* GET home page. */
router.get('/drinks', function(req, res, next) {
  //respond with data of all drinks in db
   //drinks.saveDrink({drinkName: 'fruitpunch'});
   drinks.getAllDrinks(function(results) {
    console.log('results from router.get callback', results);
    //console.log(results);
    //res.send(results);
  });
  
  //console.log('adf');
});

//test
request(router)
  .get('/drinks')
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
  });

module.exports = router;