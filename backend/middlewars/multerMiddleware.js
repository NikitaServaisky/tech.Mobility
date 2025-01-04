const multer = require('multer');
const path = require('path');

// הגדרת אחסון הקבצים
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //dynamic folder selection based on route or custom logic
    if (req.route.path.includes('profile')) {
      cb(null, 'uploads/profiles');
    } else if (req.route.path.includes('pickupPhoto')) {
      cb(null, 'uploads/pickupPhotos');
    } else {
      return cb(new Error('Invalid route for file upload'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// סינון קבצים לפי סוג
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
  }
};

// הגדרת Multer
const upload = multer({ storage, fileFilter, limits: {
  fileSize: 5 * 1024 * 1024
}, });

module.exports = upload;
