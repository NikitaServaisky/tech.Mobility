const jwt = require('jsonwebtoken');
const getDashboardUrlByRole = require('../utils/roleTodashboard');

// Middleware מאוחד
const authMiddleware = (req, res, next) => {
  // בדיקת סשן (Passport)
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  // בדיקת JWT
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // בדיקה אם המשתמש פועל על המשאבים שלו
    if (req.params.id && req.params.id !== decoded.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    req.dashBoardUrl = getDashboardUrlByRole(req.user.role);

    return next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;