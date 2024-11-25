const mongoose =  require('mongoose');

const rideHistorySchema = new mongoose.Schema({
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // מזהה נהג
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // מזהה לקוח
    pickupLocation: { type: String, required: true }, // מיקום איסוף
    dropoffLocation: { type: String, required: true }, // מיקום הורדה
    rideDate: { type: Date, default: Date.now }, // תאריך נסיעה
    rideCost: { type: Number, required: true }, // עלות נסיעה
    rideDuration: { type: Number }, // משך זמן נסיעה בדקות
    status: { 
      type: String, 
      enum: ['completed', 'canceled', 'in-progress'], 
      default: 'completed' 
    }, // סטטוס נסיעה
  });
  
  const RideHistory = mongoose.model('RideHistory', rideHistorySchema);
  
  module.exports = RideHistory;
  