const express = require('express');
const router = express.Router();
const { profile } = require('../controllers/usersController');
const authMiddleware = require('../middlewars/authMiddleware');

router.get('/profile/:id', authMiddleware, profile);

module.exports = router;
