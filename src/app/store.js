import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import moviesReducer from '../features/movieSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    movies:moviesReducer,
  },
});
