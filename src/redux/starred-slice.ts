import { createSlice } from '@reduxjs/toolkit';

import { MovieItemModel } from 'models';
import { findMovieItem } from './utils';

const starredSlice = createSlice({
  name: 'starred',
  initialState: {
    starredMovies: [] as MovieItemModel[],
  },
  reducers: {
    starMovie: (state, action) => {
      state.starredMovies = [action.payload, ...state.starredMovies];
    },

    unstarMovie: (state, action) => {
      const indexOfId = findMovieItem(state.starredMovies, action.payload.id);
      state.starredMovies.splice(indexOfId, 1);
    },

    clearAllStarred: (state) => {
      state.starredMovies = [];
    },
  },
});

export default starredSlice;
