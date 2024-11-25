const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User");
require("dotenv").config();

module.exports = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback', // שנה בהתאם לשרת שלך
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // בדוק אם המשתמש כבר קיים במערכת
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        // צור משתמש חדש אם אינו קיים
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          profileImage: profile.photos[0]?.value || null,
        });
      }
      return done(null, user);
    } catch (err) {
      console.error('Google authentication error:', err);
      done(err, null);
    }
  }));
};
