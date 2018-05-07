var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // verify proper login locally
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
  // pass function (with 3 params) as parameter to LocalStrategy
  function (username, password, done) {
      // if we find the user, we need to check if the password matches and signel whether ok
      User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
              return done(null, false, { message: 'User not found.' });
          }
          if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
      });
  }));
