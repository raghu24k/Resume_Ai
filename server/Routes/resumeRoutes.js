const express = require('express');
const router = express.Router();
const {
    getResumes,
    createResume,
    getResumeById,
    updateResume,
    deleteResume,
} = require('../Controllers/resumeController');
const { analyzeResume } = require('../Controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getResumes).post(protect, createResume);
router.route('/:id').get(protect, getResumeById).put(protect, updateResume).delete(protect, deleteResume);
router.post('/:id/analyze', protect, analyzeResume);

module.exports = router;