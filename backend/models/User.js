const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // שם פרטי
  lastName: { type: String, required: true }, // שם משפחה
  email: { type: String, required: true }, // אימייל
  password: {type: String, required: true}, // סיסמה
  phone: { type: String, required: true }, // טלפון
  city: { type: String, required: true }, // עיר מגורים
  isDriver: { type: Boolean, default: false }, // האם המשתמש מציע הסעות
  
  // שדות אופציונליים לנהגים בלבד:
  driverDetails: {
    vehicle: {
      licensePlate: { type: String }, // מספר רכב
      insurancePolicy: { type: String }, // מספר פוליסת ביטוח חובה
      insuranceExpiry: { type: Date }, // תוקף ביטוח
    },
    driverLicense: { type: String }, // מספר רישיון נהיגה
  },

  // סטטוס והרשאות:
  isVerified: { type: Boolean, default: false }, // אימות חשבון
  role: { type: String, default: "user" }, // תפקיד (משתמש רגיל או מנהל)
  
  // תאריך יצירת החשבון:
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
