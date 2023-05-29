import { RootState } from '../init/store';

export const getAllMovies = (state: RootState) => {
	return state.movies;
};

export const getWatchLaterMovies = (state: RootState) => {
	return state.watchLater;
};

export const getStarredMovies = (state: RootState) => {
	return state.starred;
};
