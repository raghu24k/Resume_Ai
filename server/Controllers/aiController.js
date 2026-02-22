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

        console.log("Sending request to Groq...");

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 2048,
        });

        const text = chatCompletion.choices[0]?.message?.content || '';
        console.log("Groq Response received.");

        // Robust JSON extraction
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        let jsonString = '';
        if (jsonMatch) {
            jsonString = jsonMatch[0];
        } else {
            jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        }

        let feedback;
        try {
            feedback = JSON.parse(jsonString);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.error("Failed JSON String:", jsonString);
            throw new Error("AI returned invalid JSON format");
        }

        resume.atsScore = feedback.score || 0;
        resume.atsFeedback = JSON.stringify(feedback);
        await resume.save();

        res.status(200).json(feedback);

    } catch (error) {
        console.error("FULL AI ANALYSIS ERROR:", error);
        res.status(500).json({ message: 'AI Analysis Failed', error: error.message });
    }
};

module.exports = { analyzeResume };
