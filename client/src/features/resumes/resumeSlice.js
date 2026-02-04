import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import resumeService from './resumeService';

const initialState = {
    resumes: [],
    currentResume: null,
    analysisResult: null, // New State for Analysis
    isError: false,
    isSuccess: false,
    isLoading: false,
    isAnalyzing: false, // Separate loading state for AI
    message: '',
};

// Get user resumes
export const getResumes = createAsyncThunk(
    'resumes/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await resumeService.getResumes(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create new resume
export const createResume = createAsyncThunk(
    'resumes/create',
    async (resumeData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await resumeService.createResume(resumeData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update resume
export const updateResume = createAsyncThunk(
    'resumes/update',
    async ({ id, resumeData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await resumeService.updateResume(id, resumeData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get resume by ID
export const getResumeById = createAsyncThunk(
    'resumes/getOne',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await resumeService.getResumeById(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Analyze Resume
export const analyzeResume = createAsyncThunk(
    'resumes/analyze',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await resumeService.analyzeResume(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetStatus: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
            state.isAnalyzing = false;
        },
        updateLocalResume: (state, action) => {
            // Optimistic update for builder
            state.currentResume = { ...state.currentResume, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getResumes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getResumes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.resumes = action.payload;
            })
            .addCase(getResumes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createResume.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createResume.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.resumes.push(action.payload);
                state.currentResume = action.payload;
            })
            .addCase(createResume.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getResumeById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getResumeById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentResume = action.payload;
            })
            .addCase(getResumeById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateResume.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentResume = action.payload;
            })
            .addCase(analyzeResume.pending, (state) => {
                state.isAnalyzing = true;
            })
            .addCase(analyzeResume.fulfilled, (state, action) => {
                state.isAnalyzing = false;
                state.analysisResult = action.payload;
            })
            .addCase(analyzeResume.rejected, (state, action) => {
                state.isAnalyzing = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset, resetStatus, updateLocalResume } = resumeSlice.actions;
export default resumeSlice.reducer;