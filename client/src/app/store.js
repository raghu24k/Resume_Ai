import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import resumeReducer from '../features/resumes/resumeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        resumes: resumeReducer,
    },
});

