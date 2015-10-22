var assert = require('chai').assert;
//var db = require('seraph');
var Users = require('../server/models/user.js');
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
  var config = require('../config.js');
  db = require("seraph")({
    server: "http://localhost:7474",
    user: config.neo4jAuth.user,
    pass: config.neo4jAuth.password //your password here
  });  
}

var user = {userName:'Jackie Chan'};
Users.saveUser(user);

var userList = Users.getUser('Jackie Chan');
console.log(userList);

// db.find(user, function(err, result) { 
//     //may need to account for result being array of 1
//     console.log('db.find triggered');
//       if (err) {
//         throw err;
//       } else {
//         console.log(result);//may return undefined or similar if no user
//         return result; 
//       }
//     });

// require('disposable-seraph')(function(err, db, neo) {
// //   // //db = seraph object pointing to a real DB!
// //   // //neo = neo4j-supervisor object
  // var user = {userName:'Jackie Chan'};
  // Users.saveUser(user);
// });
// describe('User', function() {
//   describe('saveUser', function() {
//     it('should save a user node to neo4j', function(){
//       var user = {userName:'Jackie Chan'};
//        Users.saveUser(user);
//        assert.equal(Users.getUser(user).userName, 'Jackie Chan');
//       // assert.equal(user.userName, 'Jackie Chan');
//       // console.log('user var defined');
//   //     require('disposable-seraph')(function(err, db, neo) {
//   // //db = seraph object pointing to a real DB!
//   // //neo = neo4j-supervisor object
//   //       // console.log('disposable-seraph required');
//   //       db.save(user, function(err, user) {
//   //             // console.log('save triggered');
//   //             db.find(user, function(err, result) {
//   //               if (result) {console.log(success);
//   //               }
//   //             });
//   //           });
//   //       });
     
//     });
//   });
// });

