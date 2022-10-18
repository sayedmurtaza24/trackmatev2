import studentReducer from '../slices/studentSlice';
import classReducer from '../slices/classSlice';
import teacherReducer from '../slices/teacherSlice';
import authReducer from '../slices/authSlice';
import assessmentReducer from '../slices/assessmentSlice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        student: studentReducer,
        class: classReducer,
        teacher: teacherReducer,
        auth: authReducer,
        assessment: assessmentReducer,
    }
});

export default store;