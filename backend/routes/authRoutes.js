const express = require('express');
const router = express.Router();
const { registerNewUser, userLogin, verificationUser } = require('../controllers/authController');

router.post('/registration', registerNewUser);
router.post('/login', userLogin);
router.post('/verification', verificationUser);

module.exports = router;
