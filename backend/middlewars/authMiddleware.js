const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req.params.id && req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    if (!req.user.isVerified || req.user.role === 'deactivated') {
      return res.status(403).json({ message: 'Account is deactivated or not verified' });
    }

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;