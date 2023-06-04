import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk(
  'fetch-movies',
  async ({ apiUrl, append }, { getState }) => {
    const response = await fetch(apiUrl).then((response) => response.json());

    if (append) {
      const results = [
        ...(getState()?.movies?.movies?.results ?? []),
        ...(response.results ?? [])];

      response.results = results;
    }
    return response;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchStatus: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.fetchStatus = 'success';
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = 'error';
      });
  },
});

export default moviesSlice;
