import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import videosSliceReducer from '../features/videos/videosSlice';
import quizzesSliceReducer from '../features/quizzes/quizzesSlice';
import marksSliceReducer from '../features/marks/marksSlice';
import assignmentsSliceReducer from '../features/assignments/assignmentsSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    videos: videosSliceReducer,
    quizzes: quizzesSliceReducer,
    assignments: assignmentsSliceReducer,
    marks:marksSliceReducer,
  },
  devTools:process.env.NODE_ENV!=="production",
  middleware:(getDefaultMiddlewares)=>getDefaultMiddlewares().concat(apiSlice.middleware),
});
