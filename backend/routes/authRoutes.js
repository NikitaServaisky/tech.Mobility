const express = require('express');
const passport = require('passport');
const { registerNewUser, userLogin, /*verificationUser*/ } = require('../controllers/authController');

const router = express.Router();

router.post('/registration', registerNewUser);
router.post('/login', userLogin);
//router.post('/verification', verificationUser);
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

module.exports = router;
