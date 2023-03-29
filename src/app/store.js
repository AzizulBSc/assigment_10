import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import videosSliceReducer from '../features/videos/videosSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    videos: videosSliceReducer,
  },
  devTools:process.env.NODE_ENV!=="production",
  middleware:(getDefaultMiddlewares)=>getDefaultMiddlewares().concat(apiSlice.middleware),
});
