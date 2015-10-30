//This file handles incoming request serves static files

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// uncomment to run migrations.js
// var migrations = require('./server/migrations/migrations.js');

// routing 
var request = require("request");
var session = require('express-session');
var routes = require('./server/middlewares/index.js');
var drinks = require('./server/middlewares/drinks.js');
var recommend = require('./server/middlewares/recommendKNN.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'client/dist')));
app.use('/login', express.static(path.join(__dirname, 'client/login')));

app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: 'infinity divded by infinity'
}));

app.use('/', routes);

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
var GOOGLE_CONSUMER_KEY = require('./config.js').googleAuth.clientId || process.env.googleId;
var GOOGLE_CONSUMER_SECRET = require('./config.js').googleAuth.clientSecret || process.env.googleSecret;

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  // console.log("inside serialize user", user, done);
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(obj, done) {
  user.getUser(obj.userName, function(err, user) {
    console.log("inside deserializeUser", err, user[0]);
    done(err, user[0]);
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
      req.session.userRecord = {
        userName: profile._json.displayName,
        email: profile._json.emails[0].value,
        googleId: profile._json.id
      };
      // console.log("user record in strategy", req.session.userRecord);
      // associate the Google account with a user record in your database,
      // and return that user instead.
      var name = req.session.userRecord.userName;
      user.getUser(name, function (err, nodes) {
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
=======
>>>>>>> add drinks and recommend routers to app.js.
    });
  }
));

