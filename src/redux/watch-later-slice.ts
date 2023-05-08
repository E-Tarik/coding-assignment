import { createSlice } from '@reduxjs/toolkit';

import { MovieItemModel } from 'models';
import { findMovieItem } from './utils';

const watchLaterSlice = createSlice({
  name: 'watch-later',
  initialState: {
    watchLaterMovies: [] as MovieItemModel[],
  },
  reducers: {
    addToWatchLater: (state, action) => {
      state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
    },

    removeFromWatchLater: (state, action) => {
      const indexOfId = findMovieItem(
        state.watchLaterMovies,
        action.payload.id
      );
      state.watchLaterMovies.splice(indexOfId, 1);
    },

    removeAllWatchLater: (state) => {
      state.watchLaterMovies = [];
    },
  },
});

export default watchLaterSlice;
