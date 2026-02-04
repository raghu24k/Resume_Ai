import axios from 'axios';

const API_URL = '/api/resumes/';

// Get user resumes
const getResumes = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

// Create new resume
const createResume = async (resumeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, resumeData, config);
    return response.data;
};

// Update resume
const updateResume = async (id, resumeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, resumeData, config);
    return response.data;
};

// Get resume by ID
const getResumeById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + id, config);
    return response.data;
};

// Delete resume
const deleteResume = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

// Analyze resume
const analyzeResume = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + id + '/analyze', {}, config);
    return response.data;
};

const resumeService = {
    getResumes,
    createResume,
    updateResume,
    getResumeById,
    deleteResume,
    analyzeResume,
};

export default resumeService;