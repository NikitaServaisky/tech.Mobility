const express = require('express');
const { profile, updateProfileImage } = require('../controllers/usersController');
const { getDashboard} = require('../controllers/dashboardController');
const authMiddleware = require('../middlewars/authMiddleware');
const upload = require('../middlewars/multerMiddleware');

const router = express.Router();

router.get('/profile/:id', authMiddleware, profile);
router.post('/profile/:id/image', authMiddleware, upload.single('profileImage'), updateProfileImage);
// router.get('/getdashboard/:id', authMiddleware, getDashboard);

module.exports = router;
