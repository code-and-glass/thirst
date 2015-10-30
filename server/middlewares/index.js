var app = require('express');
var router = express.Router();
  

router.use('/login', require('./authenticate'));
router.use('/recommendKNN', require('./recommendKNN'));
router.use('/drinks', require('./drinks'));
router.use('/users', require('./users'));

// router.get('/', function(req, res) {
//   Comments.all(function(err, comments) {
//     res.render('index')
//   })
// })

module.exports = router;