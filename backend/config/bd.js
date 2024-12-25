const mongoose = require('mongoose');
require('dotenv').config();
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.mnev8.mongodb.net/`,
    );
    console.log('MongoDB connected');
  } catch (err) {
    console.error('mongoDB connection error', err);
    process.exit(1);
  }
};

module.exports = connectDB;
