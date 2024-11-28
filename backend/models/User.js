const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // שם פרטי
  lastName: { type: String, required: true }, // שם משפחה
  email: { type: String, required: true, unique: true }, // דוא"ל
  phone: { type: String, required: true, unique: true }, // טלפון
  password: { type: String, required: true }, // סיסמה
  profileImage: { type: String }, // נתיב התמונה
  dateOfBirth: { type: Date, required: true }, // תאריך לידה
  city: { type: String, required: true }, // עיר מגורים
  isDriver: { type: Boolean, default: false }, // האם המשתמש נהג
  isVerified: { type: Boolean, default: false }, // האם המשתמש מאומת
  role: { 
    type: String, 
    enum: ['owner', 'admin', 'driver', 'customer', 'deactivated'], 
    default: 'customer' 
  }, // תפקיד המשתמש
  createdAt: { type: Date, default: Date.now }, // תאריך יצירת החשבון
  
  // פרטי נהג בלבד:
  driverDetails: {
    profileImage: { type: String }, // תמונת פרופיל לנהג
    vehicle: {
      licensePlate: { type: String }, // מספר רכב
      insurancePolicy: { type: String }, // פוליסת ביטוח חובה
      insuranceExpiry: { type: Date }, // תוקף ביטוח
    },
    driverLicense: { type: String }, // רישיון נהיגה
    idCardImage: { type: String }, // צילום ת"ז
    medicalApproval: { type: String }, // אישור רפואי
    bankDetails: {
      accountNumber: { type: String },
      bankName: { type: String },
      branchCode: { type: String },
    }, // פרטי בנק
  },

  // פרטי תשלום ללקוחות:
  paymentDetails: {
    creditCardNumber: { type: String }, // כרטיס אשראי ללקוח
    expirationDate: { type: String },
    cvv: { type: String },
  },
});

// יצירת המודל
const User = mongoose.model('User', userSchema);

module.exports = User;
