import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieItemModel, ResponseModel, FetchStatusEnum } from 'models';

export const fetchMovies = createAsyncThunk(
  'fetch-movies',
  async (apiUrl: string) => {
    const response = await fetch(apiUrl);
    return response.json();
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: {} as ResponseModel<MovieItemModel[]>,
    fetchStatus: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (state?.movies?.results) {
          const idsList = new Set(
            state.movies.results.map(({ id }: MovieItemModel) => id)
          );
          const data = {
            page: action.payload?.page,
            total_pages: action.payload?.total_pages,
            total_results: action.payload?.total_results,
            results: [
              ...state.movies.results,
              ...action.payload.results.filter(
                ({ id }: MovieItemModel) => !idsList.has(id)
              ),
            ],
          };

          return {
            ...state,
            movies: data,
            fetchStatus: FetchStatusEnum.SUCCESS,
          };
        } else {
          return {
            ...state,
            movies: action.payload,
            fetchStatus: FetchStatusEnum.SUCCESS,
          };
        }
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = FetchStatusEnum.LOADING;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = FetchStatusEnum.ERROR;
      });
  },
  reducers: {
    removeAllMovies: (state) => {
      return {
        ...state,
        movies: {} as ResponseModel<MovieItemModel[]>,
      };
    },
  },
});

export const { removeAllMovies } = moviesSlice.actions;

export default moviesSlice;
