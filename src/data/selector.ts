import { AppState } from "../types/state";

export const moviesSelector = (state: AppState) => state.movies.movies;

export const fetchStatusSelector = (state: AppState) =>
  state.movies.fetchStatus;

export const watchLaterSelector = (state: AppState) => {
  return state.watchLater.watchLaterMovies;
};

export const starredMoviesSelector = (state: AppState) => {
  // console.log(state);
  return state.starred.starredMovies;
};
