import { createSlice } from '@reduxjs/toolkit';

import { MovieItemModel, ResponseModel } from 'models';
import { findMovieItem } from 'redux/utils';

const initialState = {
  all: {} as ResponseModel<MovieItemModel[]>,
  favorites: [] as MovieItemModel[],
  watchLater: [] as MovieItemModel[],
};

export const moviesSlice = createSlice({
  name: 'moviesSlice',
  initialState,
  reducers: {
    // Load all Movies
    loadAllMovies: (state, action) => {
      if (state?.all?.results) {
        const idsList = new Set(
          state.all.results.map(({ id }: MovieItemModel) => id)
        );
        const data = {
          page: action.payload?.page,
          total_pages: action.payload?.total_pages,
          total_results: action.payload?.total_results,
          results: [
            ...state.all.results,
            ...action.payload.results.filter(
              ({ id }: MovieItemModel) => !idsList.has(id)
            ),
          ],
        };

        return {
          ...state,
          all: data,
        };
      } else {
        return {
          ...state,
          all: action.payload,
        };
      }
    },

    removeAllMovies: (state) => {
      return {
        ...state,
        all: {} as ResponseModel<MovieItemModel[]>,
      };
    },

    // FAVORITES
    addToFavorites: (state, action) => {
      return {
        ...state,
        favorites: [action.payload, ...state.favorites],
      };
    },

    removeFromFavorites: (state, action) => {
      const indexOfId = findMovieItem(state.favorites, action.payload.id);
      state.favorites.splice(indexOfId, 1);
    },

    removeAllFavorites: (state) => {
      return {
        ...state,
        favorites: [] as MovieItemModel[],
      };
    },

    // WATCH LATER
    addToWatchLater: (state, action) => {
      return {
        ...state,
        watchLater: [action.payload, ...state.watchLater],
      };
    },

    removeFromWatchLater: (state, action) => {
      const indexOfId = findMovieItem(state.watchLater, action.payload.id);
      state.watchLater.splice(indexOfId, 1);
    },

    removeAllWatchLater: (state) => {
      return {
        ...state,
        watchLater: [] as MovieItemModel[],
      };
    },
  },
});

export const {
  loadAllMovies,
  removeAllMovies,
  // Favorites
  addToFavorites,
  removeFromFavorites,
  removeAllFavorites,
  // Watch later
  addToWatchLater,
  removeFromWatchLater,
  removeAllWatchLater,
} = moviesSlice.actions;

export default moviesSlice.reducer;
