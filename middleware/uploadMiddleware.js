const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use the temporary directory for serverless environments
const uploadDir = '/tmp/uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Save files to the '/tmp/uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp as filename
  }
});

module.exports = multer({ storage });
