// //when a user logins with google/fb a request is sent to server
// // and a response is sent back to client



// //clientID: 267759284958-mv5iqfbu27f41i2ljhj5dktrt96rsmha.apps.googleusercontent.com
// //clientSecret: 5by7bp6YDv6AOCCJwXufOEt7


// //get default credential type based on runtime environment
// google.auth.getApplicationDefault(function(err, authClient) {
//   if (err) {
//     res.send('Failed to get the default credentials: ' + String(err));
//     return;
//   }
//   // The createScopedRequired method returns true when running on GAE or a local developer
//   // machine. In that case, the desired scopes must be passed in manually. When the code is
//   // running in GCE or a Managed VM, the scopes are pulled from the GCE metadata server.
//   // See https://cloud.google.com/compute/docs/authentication for more information.
//   if (authClient.createScopedRequired && authClient.createScopedRequired()) {
//     // Scopes can be specified either as an array or as a single, space-delimited string.
//     authClient = authClient.createScoped(['https://www.googleapis.com/auth/compute']);
//   }
//   // Fetch the list of GCE zones within a project.
//   // NOTE: You must fill in your valid project ID before running this sample!
//   var projectId = 'thirst-1104';
//   compute.zones.list({ project: projectId, auth: authClient }, function(error, result) {
//     console.log(error, result);
//   });
// });

var express = require('express');
var passport = require('passport');
var util = require('util');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
    clientID: 267759284958-mv5iqfbu27f41i2ljhj5dktrt96rsmha.apps.googleusercontent.com,
    clientSecret: GOOGLE_CLIENT_SECRET,
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

app.use(express.session({ secret: 'keyboard cat' }));
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

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}