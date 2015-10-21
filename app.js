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
app.use(express.static(path.join(__dirname, 'client/dist')));

app.use('/', routes);
app.use('/users', users);

module.exports = app;

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