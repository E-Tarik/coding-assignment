import { createSelector } from 'reselect';

import { StoreModel } from 'models';

const selectMovies = (state: StoreModel) => state.movies;

export const selectAll = createSelector([selectMovies], (movies) => movies.all);
export const selectFavorites = createSelector(
  [selectMovies],
  (movies) => movies.favorites
);
export const selectWatchLater = createSelector(
  [selectMovies],
  (movies) => movies.watchLater
);
