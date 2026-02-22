const Groq = require('groq-sdk');
const Resume = require('../models/Resume');

// @desc    Analyze resume with AI
// @route   POST /api/resumes/:id/analyze
// @access  Private
const analyzeResume = async (req, res) => {
    try {
        console.log("Analyzing resume for user:", req.user.id);

        if (!process.env.GROQ_API_KEY) {
            console.error("GROQ_API_KEY is missing in environment variables!");
            throw new Error("Server configuration error: Missing API Key");
        }

        // Initialize Groq inside the function
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        if (resume.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const resumeText = JSON.stringify(resume);

        const prompt = `Act as a professional Resume Writer and ATS Expert.
Analyze the following resume JSON data.

Resume Data:
${resumeText}

Please provide a JSON response with the following structure (do NOT return markdown, just raw JSON):
{
    "score": <number between 0 and 100>,
    "strengths": [<array of strings>],
    "weaknesses": [<array of strings>],
    "suggestions": [<array of actionable strings>],
    "summary": "<brief overall summary>"
}`;
