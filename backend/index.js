const express = require('express');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/bd');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const passportConfig = require('./authtentications/passportConfig');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

// הפעלת האימות של passport
app.use(passport.initialize());
app.use(passport.session());

// הפעלת קונפיגורציה של passport
passportConfig();

app.use('/', authRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send('Hello from Express.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
