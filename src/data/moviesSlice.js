import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { api } from '../api';

export const fetchMovies = createAsyncThunk('fetch-movies', () => api.movies.discover());

export const searchMovies = createAsyncThunk('search-movies', payload =>
  api.movies.search({ query: payload.query }),
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchStatus: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(fetchMovies.fulfilled, searchMovies.fulfilled), (state, action) => {
        state.movies = action.payload;
        state.fetchStatus = 'success';
      })
      .addMatcher(isAnyOf(fetchMovies.pending, searchMovies.pending), state => {
        state.fetchStatus = 'loading';
      })
      .addMatcher(isAnyOf(fetchMovies.rejected, searchMovies.rejected), state => {
        state.fetchStatus = 'error';
      });
  },
});

export default moviesSlice;
