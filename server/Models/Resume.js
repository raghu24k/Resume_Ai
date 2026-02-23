const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String, // e.g., "Full Stack Dev Resume"
        default: 'Untitled Resume',
    },
    personalInfo: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: String,
        linkedin: String, // LinkedIn URL
        github: String, // GitHub URL
        website: String,
        summary: String,
    },
    education: [{
        school: String,
        degree: String,
        fieldOfStudy: String,
        startDate: String,
        endDate: String,
        description: String,
    }],
    experience: [{
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String, // Can be bullet points joined by newlines
    }],
    skills: [{
        name: String,
        level: String, // Beginner, Intermediate, Expert
    }],
    projects: [{
        name: String,
        description: String,
        link: String,
        technologies: String,
    }],
    certifications: [{
        name: String,
        issuer: String,
        date: String,
    }],
    atsScore: {
        type: Number,
        default: 0,
    },
    atsFeedback: {
        type: String, // AI Generated feedback
        default: '',
    },
    template: {
        type: String,
        default: 'modern', // 'modern', 'minimalist', 'professional'
    },
}, {
    timestamps: true,
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;