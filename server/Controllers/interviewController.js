const Groq = require('groq-sdk');
const Resume = require('../models/Resume');

// @desc    Generate interview questions based on resume
// @route   POST /api/interview/prepare/:resumeId
// @access  Private
const generateInterviewPrep = async (req, res) => {
    try {
        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({ message: "Server configuration error: Missing API Key" });
        }

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const resume = await Resume.findById(req.params.resumeId);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        const prompt = `Act as an expert Interviewer and Career Coach.
        Based on the candidate's resume below, generate a comprehensive interview preparation guide.
        
        Resume Skills: ${resume.skills.map(s => s.name).join(', ')}
        Experience Summary: ${resume.personalInfo.summary}
        Experience Details: ${JSON.stringify(resume.experience)}

        Provide exactly 5 technical interview questions specific to their domain/skills and 5 standard HR/Behavioral questions.
        For each HR question, provide a guide on "How to answer" emphasizing the STAR method (Situation, Task, Action, Result).
        
        Return the response in raw JSON format with this structure:
        {
            "technical": [
                { "question": "...", "answer_tips": "..." }
            ],
            "hr": [
                { "question": "...", "how_to_answer": "..." }
            ]
        }`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 3000,
        });

        const text = chatCompletion.choices[0]?.message?.content || '';
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("AI failed to provide valid JSON response");
        }

        const prepData = JSON.parse(jsonMatch[0]);
        res.status(200).json(prepData);

    } catch (error) {
        console.error("INTERVIEW PREP ERROR:", error);
        res.status(500).json({ message: 'Failed to generate interview guide', error: error.message });
    }
};

module.exports = { generateInterviewPrep };