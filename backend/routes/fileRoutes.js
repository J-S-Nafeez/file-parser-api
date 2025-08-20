

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadFile, getFileProgress, getFileContent, listFiles, deleteFile } = require('../controllers/fileController');
const dotenv = require('dotenv');
dotenv.config();

// Ensure uploads folder exists
if (!fs.existsSync(process.env.UPLOAD_DIR)) {
  fs.mkdirSync(process.env.UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/files', upload.single('file'), uploadFile);
router.get('/files/:fileId/progress', getFileProgress);
router.get('/files/:fileId', getFileContent);
router.get('/files', listFiles);
router.delete('/files/:fileId', deleteFile);

module.exports = router;
