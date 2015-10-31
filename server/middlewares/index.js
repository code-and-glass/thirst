var express = require('express');
var router = express.Router();
var passport = require('passport'); 
router.use(passport.initialize());
router.use(passport.session());

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home/login page
  res.redirect('/login');
}

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.redirect('/static');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }), 
  function (res, res) {});

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log("[OAuth2:redirect:query]:", JSON.stringify(req.query));
    // console.log("[OAuth2:redirect:body]:", JSON.stringify(req.body));
    // console.log("Session", req.session);
    // Successful authentication, redirect home.
    res.redirect('/static');
  });

module.exports = router;