//This file handles incoming request serves static files

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// uncomment to run migrations.js
// var migrations = require('./server/migrations/migrations.js');

// routing 
var request = require("request");
//var assert = require('assert');
var session = require('express-session');
var routes = require('./routes/index');
var drinks = require('./server/middlewares/drinks.js');
var recommend = require('./server/middlewares/recommendKNN.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'client/dist')));
app.use('/login', express.static(path.join(__dirname, 'client/login')));
// app.use(express.static(path.join(__dirname, 'client/login')));
app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: 'infinity divded by infinity'
}));

app.use('/', routes);
// app.use('/users', users);

//drinks routes
app.use('/drinks', drinks );
//recommend routes
app.use('/recommend' , recommend);

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home/login page
  res.redirect('/login');
}

// app.all('*', isLoggedIn);

module.exports = app;

/********************* goggle auth ***************************/
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// load up the user model
var user = require('./server/models/user.js');

// load the auth variables
var GOOGLE_CONSUMER_KEY = require('./config.js').googleAuth.clientId;
var GOOGLE_CONSUMER_SECRET = require('./config.js').googleAuth.clientSecret;


// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  // console.log("inside serialize user", user, done);
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(obj, done) {
  // console.log("inside deserializeUser", obj, done);
  user.getUser(obj.userName, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CONSUMER_KEY,
    clientSecret: GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(req, token, tokenSecret, profile, done) {
    // make the code asynchronous
    process.nextTick(function() {
      // console.log(profile); // response obj
      // create session info here if needed:
      // console.log("email object is", profile._json.emails[0]);
      req.session.userRecord = {
        userName: profile._json.displayName,
        email: profile._json.emails[0].value,
        googleId: profile._json.id
      };
      // console.log("user record in strategy", req.session.userRecord);
      // associate the Google account with a user record in your database,
      // and return that user instead.
      user.saveUser(req.session.userRecord, function (err, result) {
        // console.log(result);
        done(err, result);
      });
    });
  }
));

