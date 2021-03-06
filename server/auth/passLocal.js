var User = require('../models/userModel.js');
var passport = require('passport');
var CustomStrategy = require('passport-custom');

passport.use(User.createStrategy());

passport.use('kairos', new CustomStrategy(
  function(req, done) {
    User.findOne({ _id: req._id }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Invalid user ID' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
