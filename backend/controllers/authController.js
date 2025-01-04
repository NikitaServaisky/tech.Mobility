//authController
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/*const { sendRegistrationEmail } = require('../services/emailServices/emailService');
const { sendRegistrationSMS } = require('../services/smsServices/smsService');
const { verificationCodeTemplate } = require('../services/smsServices/smsTemplates');*/
require("dotenv").config();

// ייצור קוד אימות אקראי
//const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000);

// רישום משתמש חדש
const registerNewUser = async (req, res) => {
  const { email, password, firstName, lastName, phone, city } = req.body;

  if (!email || !password || !firstName || !lastName || !phone || !city) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      city,
      profileImage,
      role: (await User.countDocuments({})) === 0 ? "owner" : "customer",
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully.", userId: newUser._id });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
};

// אימות משתמש
const verificationUser = async (req, res) => {
  const { userId, verificationCode } = req.body;
  try {
    const user = await User.findById(userId);
    if (
      !user ||
      user.isVerified ||
      user.verificationCode !== verificationCode
    ) {
      return res.status(400).json({ message: "Invalid verification" });
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_WORD, {
      expiresIn: "1h",
    });
    await sendRegistrationEmail(user.email);

    res.status(200).json({ message: "User verified", token, userId: user._id });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ message: "Error verifying user" });
  }
};

// התחברות משתמש
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_WORD, { expiresIn: '1h' });

    // Send the response with the token and userId
    res.status(200).json({ message: 'Login successful', token, userId: user._id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in user' });
  }
};


module.exports = { registerNewUser, userLogin, verificationUser };
