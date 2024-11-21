const express = require('express');
const cors = require('cors');
const connectDB = require('./config/bd');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// Define routes
app.use('/', authRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send('Hello from Express.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
