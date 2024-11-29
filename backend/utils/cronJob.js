const cron = require('node-cron');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

cron.schedule('0 0 * * * ', async () => {
    try {
        const expiredUsers = await User.find({
            role: 'deactivated',
            reactivationToken: { $exists: true }
        });

        const now = new Date();

        for (const user of expiredUsers) {
            const decoded = jwt.verify(user.reactivationToken, process.env.JWT_SECRET_WORD);
            if (decoded && decoded.exp * 1000 < now.getTime()) {
                await User.findByIdAndDelete(user._id);
                console.log(`Deleted use ${user._id}`);
            }
        }
    } catch (err) {
        console.error('error deleting expired accounts', err);
    }
})