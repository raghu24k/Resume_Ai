const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeUploadedResume } = require('../Controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

// Configure Multer for PDF uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

router.post('/upload', protect, upload.single('resume'), analyzeUploadedResume);

module.exports = router;