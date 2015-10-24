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
var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'client/dist')));
app.use(express.static(path.join(__dirname, 'client/login')));
// app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: 'infinity divded by infinity'
}));

app.use('/', routes);
app.use('/users', users);

module.exports = app;

/********************* goggle auth ***************************/
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// load up the user model
var db = require('./server/serverConfig.js');
// load the auth variables
var GOOGLE_CONSUMER_KEY = require('./config.js').googleAuth.clientId;
var GOOGLE_CONSUMER_SECRET = require('./config.js').googleAuth.clientSecret;
console.log(GOOGLE_CONSUMER_KEY, GOOGLE_CONSUMER_SECRET);
app.use(passport.initialize());
app.use(passport.session());

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  // db.findById(id, function(err, user) {
  //   done(err, user);
  // });
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
      req.session.userRecord = {
        name: profile._json.displayName,
        googleId: profile._json.id
      };
      // associate the Google account with a user record in your database,
      // and return that user instead.
      // console.log("session", req.session);
      db.save({ googleId: profile.id }, function (err, user) {
        console.log("this is the error", err);
        return done(err, user);
      });
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/auth/google', function () {
//   console.log("auth/google");
// });

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     console.log("[OAuth2:redirect:query]:", JSON.stringify(req.query));
//     console.log("[OAuth2:redirect:body]:", JSON.stringify(req.body));
//     console.log("Session", req.session);
//     // Successful authentication, redirect home.

//     res.send(path.join(__dirname, '/client/dist'));
//     // app.use(express.static(path.join(__dirname, 'client/dist')));
//   });

app.get( '/auth/google/callback', 
  passport.authenticate( 'google', { 
    successRedirect: '/static',
    failureRedirect: '/login'
}));

app.get('/', function (req, res) {

})

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home/login page
  res.redirect('/login');
}

/***************** End Auth ******************/

// The following needs to be reviewed and removed:


/********************* start neo4j ***************************/

/*
var request = require("request");

var assert = require('assert');

var migrations = require('/server');

var db;

//********************* AUTH testing to be moved later ***************************


var passport = require('passport');
var util = require('util');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


  var url = require('url').parse(process.env.GRAPHENEDB_URL);

  db = require("seraph")({
    server: url.protocol + '//' + url.host,
    user: url.auth.split(':')[0],
    pass: url.auth.split(':')[1]
  });
} else {

  var config = require('./config.js');
  db = require("seraph")({server: "http://localhost:7474",
                            user: config.neo4jAuth.user,
                            pass: config.neo4jAuth.password //your password here
                          });
}

db.save({ name: "Artem"}, function(err, node) {
  if (err) throw err;
  console.log("new user Artem added to db");

  // db.delete(node, function(err) {
  //   if (err) throw err;
  //   console.log("Test-Man away!");
  // });
});
var array = [];
var resultMatrix;
var read = function(err, relationship) {
 db.rel.read(relationship.id, function(err, readRelationship) {
    var rating = readRelationship.properties.rating;
    console.log(rating);
    array.push(rating);
    console.log(array);
=======
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: '267759284958-mv5iqfbu27f41i2ljhj5dktrt96rsmha.apps.googleusercontent.com',
    clientSecret: '5by7bp6YDv6AOCCJwXufOEt7',
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

//to go in app.js 

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  });
};




app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
//**************************************************
*/