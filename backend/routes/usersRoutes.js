const express = require('express');
const { profile } = require('../controllers/usersController');
const authMiddleware = require('../middlewars/authMiddleware');
const router = express.Router();

router.get('/profile/:id', authMiddleware, profile);

module.exports = router;
