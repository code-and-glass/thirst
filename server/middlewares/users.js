//controller for users
//when a request for a user's data comes in, a response is sent to the front-end

var Promise = require('bluebird');
var array = Promise.promisifyAll([1,2,3,4,5,5]);
var newarray = Promise.map(array, function(item) {
  return item +1;
}) ;
// console.log(
// newarray
// );
