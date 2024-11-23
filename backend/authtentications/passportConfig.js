const passport = require('passport');
const facebookStrategy = require('./strategies/facebookStrategy');
const User = require('../models/User')
require('dotenv').config();

module.exports = () => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // קובץ סטרטגיות
  facebookStrategy();
  // אם תרצה להוסיף אסטרטגיה נוספת, פשוט תקרא לה כאן
};
