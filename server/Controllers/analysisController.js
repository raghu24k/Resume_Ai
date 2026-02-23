const Groq = require('groq-sdk');
const pdfParse = require('pdf-parse');

// @desc    Analyze uploaded PDF resume
// @route   POST /api/analysis/upload
// @access  Private
const analyzeUploadedResume = async (req, res) => {
    try {
        console.log("Received upload request...");

        if (!process.env.GROQ_API_KEY) {
            console.error("GROQ_API_KEY is missing!");
            throw new Error("Server configuration error: Missing API Key");
        }

        // Initialize Groq inside the function
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a PDF file' });
        }

        console.log("File received:", req.file.originalname, "Size:", req.file.size);

        // 1. Extract Text from PDF
        let resumeText = '';
        try {
            const pdfData = await pdfParse(req.file.buffer);
            resumeText = pdfData.text;
            console.log("PDF Text Extracted. Length:", resumeText.length);
        } catch (parseErr) {
            console.error("PDF Parsing failed:", parseErr);
            return res.status(500).json({ message: "Failed to read PDF file", error: parseErr.message });
        }

        if (!resumeText || resumeText.length < 50) {
            console.warn("PDF extracted text is too short.");
            return res.status(400).json({ message: 'Could not extract enough text from this PDF. Please try another file.' });
        }

        // 2. Send to Groq
        const prompt = `Act as a professional Resume Writer and ATS Expert.
Analyze the following RESUME TEXT extracted from a PDF.

RESUME TEXT:
${resumeText}

Please provide a JSON response with the following structure (do NOT return markdown, just raw JSON):
{
    "score": <number between 0 and 100>,
    "strengths": [<array of strings>],
    "weaknesses": [<array of strings>],
    "suggestions": [<array of actionable strings>],
    "summary": "<brief overall summary>"
}`;

        console.log("Sending to Groq...");

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 2048,
        });

        const text = chatCompletion.choices[0]?.message?.content || '';
        console.log("Groq Response Received.");

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
            console.error("JSON Parse Error:", parseError, "Raw Text:", text);
            throw new Error("AI returned invalid JSON format");
        }

        res.status(200).json(feedback);

    } catch (error) {
        console.error("UPLOAD ANALYSIS ERROR:", error);
        res.status(500).json({ message: 'Analysis Failed', error: error.message });
    }
};

module.exports = { analyzeUploadedResume };
