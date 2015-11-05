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


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
app.use('/static', express.static(path.join(__dirname, 'client/dist')));
app.use('/login', express.static(path.join(__dirname, 'client/login')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);

//drinks routes
app.use('/drinks', drinks );
//recommend routes
app.use('/recommend' , recommend);
//rate routes
app.use('/rate', rate);
//
app.use('ratedDrink', ratedDrinks);
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
  // console.log("inside serialize user", user, done);
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(obj, done) {
  user.getUser({userName: obj.userName}, function(err, user) {
    // console.log("inside deserializeUser", err, user[0]);
    done(err, user[0]);
  });
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CONSUMER_KEY,
    clientSecret: GOOGLE_CONSUMER_SECRET,
    "callbackURL": callbackURL,
    passReqToCallback   : true
  },
  function(req, token, tokenSecret, profile, done) {
    // make the code asynchronous
    process.nextTick(function() {
      // create session info here if needed:
      req.session.userRecord = {
        userName: profile._json.displayName,
        email: profile._json.emails[0].value,
        googleId: profile._json.id
      };
      // console.log("user record in strategy", req.session.userRecord);
      // associate the Google account with a user record in your database,
      // and return that user instead.
      var id = req.session.userRecord.googleId;
      user.getUser({googleId: id}, function (err, nodes) {
        if (err === null && nodes.length === 0) {
          user.saveUser(req.session.userRecord, function (err, result) {
            if (err) throw new Error(err);
            done(err, result);
          });
        } else {
          done(err, nodes[0]);
        }
      });

    });


app.use('/', routes);

//drinks routes
app.use('/drinks', drinks );
//recommend routes
app.use('/recommend' , recommend);
//rate routes
app.use('/rate', rate);

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();

  }
));

// app.all('*', isLoggedIn);

module.exports = app;

/********************* goggle auth ***************************/

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// load up the user model
var user = require('./server/models/user.js');

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
  // console.log("inside serialize user", user, done);
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(obj, done) {
  user.getUser({userName: obj.userName}, function(err, user) {
    // console.log("inside deserializeUser", err, user[0]);
    done(err, user[0]);
  });
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CONSUMER_KEY,
    clientSecret: GOOGLE_CONSUMER_SECRET,
    "callbackURL": callbackURL,
    passReqToCallback   : true
  },
  function(req, token, tokenSecret, profile, done) {
    // make the code asynchronous
    process.nextTick(function() {
      // create session info here if needed:
      req.session.userRecord = {
        userName: profile._json.displayName,
        email: profile._json.emails[0].value,
        googleId: profile._json.id
      };
      // console.log("user record in strategy", req.session.userRecord);
      // associate the Google account with a user record in your database,
      // and return that user instead.

      return done(null, profile);

      var id = req.session.userRecord.googleId;
      user.getUser({googleId: id}, function (err, nodes) {
        if (err === null && nodes.length === 0) {
          user.saveUser(req.session.userRecord, function (err, result) {
            if (err) throw new Error(err);
            done(err, result);
          });
        } else {
          done(err, nodes[0]);
        }
      });

    });
  }
));
