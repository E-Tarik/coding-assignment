import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { api } from '../api';

export const fetchMovies = createAsyncThunk('fetch-movies', async payload => {
  try {
    return await api.movies.discover({ page: payload.page });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

export const searchMovies = createAsyncThunk('search-movies', async payload => {
  try {
    return await api.movies.search({ query: payload.query, page: payload.page });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

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

const MODES = {
  DISCOVER: 'discover',
  SEARCH: 'search',
};

const initialState = {
  data: [],
  fetchStatus: '',
  mode: '',
  page: 0,
  pages: undefined,
  query: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        if (state.mode !== MODES.DISCOVER) {
          return { ...initialState, mode: MODES.DISCOVER };
        }
      })
      .addCase(searchMovies.pending, (state, action) => {
        if (state.mode !== MODES.SEARCH || state.query !== action.meta.arg.query) {
          return { ...initialState, mode: MODES.SEARCH, query: action.meta.arg.query };
        }

        state.query = action.meta.arg.query;
      })
      .addMatcher(isAnyOf(fetchMovies.fulfilled, searchMovies.fulfilled), (state, action) => {
        if (action.payload.page > state.page && action.payload.page <= action.payload.total_pages) {
          state.data.push(...action.payload.results);
          state.page = action.payload.page;
          state.pages = action.payload.total_pages;
        }

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

export { MODES };
export default moviesSlice;
