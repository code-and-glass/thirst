var db;
var Users = require('./models/user.js');

//Checks if deployed or local
if (process.env.GRAPHENEDB_URL){

  var url = require('url').parse(process.env.GRAPHENEDB_URL);

  db = require("seraph")({
    server: url.protocol + '//' + url.host,
    user: url.auth.split(':')[0],
    pass: url.auth.split(':')[1]
  });
} else {
  var config = require('../config.js');
  db = require("seraph")({
    server: "http://localhost:7474",
    user: config.neo4jAuth.user,
    pass: config.neo4jAuth.password //your password here
  });  
}

module.exports = db;