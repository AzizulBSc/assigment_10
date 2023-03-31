import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import assignmentsSliceReducer from '../features/assignments/assignmentsSlice';
import authSliceReducer from '../features/auth/authSlice';
import marksSliceReducer from '../features/marks/marksSlice';
import quizzesSliceReducer from '../features/quizzes/quizzesSlice';
import videosSliceReducer from '../features/videos/videosSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    videos: videosSliceReducer,
    quizzes: quizzesSliceReducer,
    assignments: assignmentsSliceReducer,
    marks:marksSliceReducer,
    auth:authSliceReducer,
  },
  devTools:process.env.NODE_ENV!=="production",
  middleware:(getDefaultMiddlewares)=>getDefaultMiddlewares().concat(apiSlice.middleware),
});
