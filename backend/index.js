//index
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/bd");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const historyRoutes = require("./routes/historyRoutes");
const authMiddleware = require('./middlewars/authMiddleware');
const createDirectories = require("./utils/createDirectories");
const passportConfig = require('./authtentications/passportConfig')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
createDirectories();
connectDB();

app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use("/auth", authRoutes);
app.use("/users", authMiddleware, usersRoutes);
app.use("/rides", authMiddleware, historyRoutes);

app.get("/", (req, res) => res.send("Hello from Express.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
