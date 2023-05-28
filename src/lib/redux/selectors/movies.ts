import { RootState } from '../init/store';

export const getMovies = (state: RootState) => {
	return state.movies as any;
};

export const getWatchLaterMovies = (state: RootState) => {
	return state.watchLater;
};

export const getStarredMovies = (state: RootState) => {
	return state.starred;
};
