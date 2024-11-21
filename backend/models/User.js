const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  facebookId: { type: String },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: {
    type: String,
    required: function () {
      return !this.googleId && !this.facebookId;
    }, // Only required if not using OAuth
  },
  city: {
    type: String,
    required: function () {
      return !this.googleId && !this.facebookId;
    },
  },
  phone: {
    type: String,
    required: function () {
      return !this.googleId && !this.facebookId;
    },
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId && !this.facebookId;
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
