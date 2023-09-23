import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies.push(action.payload); // Add the new movie to the existing array
    },
  },
});

export const { addMovies } = movieSlice.actions;

export const selectMovies = (state) => state.movies.movies; // Selector to access movies array

export default movieSlice.reducer;
