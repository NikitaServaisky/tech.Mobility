const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/bd");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const historyRoutes = require("./routes/historyRoutes");
const authMiddleware = require("./middlewars/authMiddleware");
const createDirectories = require("./utils/createDirectories");
const passportConfig = require("./authtentications/passportConfig");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session
app.use(
  session({
    secret: process.env.JWT_SECRET_WORD,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize utilities and database
createDirectories();
connectDB();

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passportConfig();

// Routes
app.use("/auth", authRoutes);
app.use("/users", authMiddleware, usersRoutes);
app.use("/rides", authMiddleware, historyRoutes);

// Root route
app.get("/", (req, res) => res.send("Hello from Express.js"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
