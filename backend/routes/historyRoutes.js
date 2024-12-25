const express = require('express');
const { getRideByStatus, createTrip, updateTrip, tripCanceled } = require('../controllers/historyController');
const authMiddleware = require('../middlewars/authMiddleware');
const upload = require('../middlewars/multerMiddleware');

const router = express.Router();

router.get('/:status', authMiddleware, getRideByStatus);
router.post('/', authMiddleware, upload.single('pickupPhoto'), createTrip);
router.put('/:tripId', authMiddleware, updateTrip);
router.patch('/:tripId/cancel', authMiddleware, tripCanceled);

module.exports = router;
