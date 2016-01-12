var express = require('express');
var router = express.Router();
var passport = require('passport'); 
var user = require('../models/user.js');

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
  // console.log("session info in /", req.session);
  // req.sessionStore.googleId = req.session.userRecord.googleId; 
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
    // console.log("Session in callback", req.session);
    var id = req.session.passport.user.id;
    var userData = {
      googleId: id,
      userName: req.session.passport.user.displayName,
      email: req.session.passport.user.emails[0]
    };
    // console.log("google ID", id);
    user.getUser({googleId: id}, function (err, nodes) {
      if (err === null && nodes.length === 0) {
        user.saveUser(userData, function (err, result) {
          if (err) throw new Error(err);
          // console.log(err, result);
          res.redirect('/');
        });
      } else {
        res.redirect('/');
      }
    });
    // Successful authentication, redirect home.
  });

module.exports = router;
