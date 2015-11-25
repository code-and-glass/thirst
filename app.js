//This file handles incoming request serves static files

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

// uncomment to run migrations.js
var migrations = require('./server/migrations/migrations.js');

// routing
var request = require("request");
var session = require('express-session');
var routes = require('./server/middlewares/index.js');
var drinks = require('./server/middlewares/drinks.js');
var recommend = require('./server/middlewares/recommendKNN.js');
var rate = require('./server/middlewares/rate.js');
var ratedDrinks = require('./server/middlewares/ratedDrinks.js');
var user = require('./server/models/user.js');


var app = express();
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home/login page
  res.redirect('./client/login');
} 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'client/dist')));
app.use('/login', express.static(path.join(__dirname, 'client/login')));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  rolling: true,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// static and auth routes
app.use('/', routes);
//drinks routes
app.use('/drinks', drinks );
//recommend routes
app.use('/recommend' , recommend);
//rate routes
app.use('/rate', rate);
//
app.use('/rated', ratedDrinks);

module.exports = app;

/********************* goggle auth ***************************/

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// load up the user model

// load the auth variables
if (process.env.googleId) {
  var GOOGLE_CONSUMER_KEY = process.env.googleId;
  var GOOGLE_CONSUMER_SECRET = process.env.googleSecret;
  var callbackURL = 'http://thirst.herokuapp.com/auth/google/callback';
} else {
  var GOOGLE_CONSUMER_KEY = require('./config.js').googleAuth.clientId;
  var GOOGLE_CONSUMER_SECRET = require('./config.js').googleAuth.clientSecret;
  var callbackURL = 'http://127.0.0.1:3000/auth/google/callback';
}

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  // console.log("inside serialize user", user);
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(obj, done) {
  // console.log("deserialize obj", obj);
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CONSUMER_KEY,
    clientSecret: GOOGLE_CONSUMER_SECRET,
    "callbackURL": callbackURL,
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    // make the code asynchronous
    // console.log('profile', profile);
    process.nextTick(function() {
      // create session info here if needed:
      // associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

module.exports = app;

