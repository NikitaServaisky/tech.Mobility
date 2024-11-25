//authRoutes
const express = require("express");
const passport = require("passport");
const upload = require('../middlewars/multerMiddleware');
const {
  registerNewUser,
  userLogin /*verificationUser*/,
} = require("../controllers/authController");

const router = express.Router();

router.post("/registration", upload.single('profileImage'),registerNewUser);
router.post("/login", userLogin);
//router.post('/verification', verificationUser);
//facebook routes
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  const token = jwt.sign(
    { id: req.user.id, email: req.user.email },
    process.env.JWT_SECRET_WORD,
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login successful', token });
});


//google routes
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'], // בקשת גישה לפרופיל ואימייל
}));

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  // יצירת טוקן JWT למשתמש
  const token = jwt.sign(
    { id: req.user.id, email: req.user.email },
    process.env.JWT_SECRET_WORD,
    { expiresIn: '1h' } // תקופת תוקף של שעה
  );

  res.json({ message: 'Login successful', token });
});

module.exports = router;
