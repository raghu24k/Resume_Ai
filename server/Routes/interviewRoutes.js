const express = require('express');
const router = express.Router();
const { generateInterviewPrep } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/prepare/:resumeId', protect, generateInterviewPrep);

module.exports = router;