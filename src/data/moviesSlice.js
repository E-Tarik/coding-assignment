import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { api } from '../api';

export const fetchMovies = createAsyncThunk('fetch-movies', () => api.movies.discover());

export const searchMovies = createAsyncThunk('search-movies', payload =>
  api.movies.search({ query: payload.query }),
);

export const fetchMovie = createAsyncThunk('search-movie', payload =>
  api.movies.movieDetails({ movieId: payload.id }),
);

export const getMovieTrailer = createAsyncThunk(
  'get-movie-trailer',
  async (payload, { dispatch }) => {
    const movie = await dispatch(fetchMovie({ id: payload.id })).unwrap();

    if (movie.videos && movie.videos.results.length) {
      const trailer = movie.videos.results.find(vid => vid.type === 'Trailer');

      return trailer ? trailer.key : movie.videos.results[0].key;
    }
  },
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
