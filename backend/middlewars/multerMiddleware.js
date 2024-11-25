const multer = require('multer');
const path = require('path');

// הגדרת אחסון הקבצים
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles'); // התיקייה שבה יישמרו הקבצים
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
