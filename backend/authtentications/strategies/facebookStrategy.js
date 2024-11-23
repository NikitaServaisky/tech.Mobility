const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/User');
require('dotenv').config();

module.exports = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ facebookId: profile.id });

          if (!user) {
            user = await User.create({
              facebookId: profile.id,
              name: profile.displayName,
              email: profile.emails ? profile.emails[0].value : '',
            });
          }

          return done(null, user);
        } catch (err) {
          console.error('Error in facebook strategy: ', err);
          return done(err, false);
        }
      }
    )
  );
};
