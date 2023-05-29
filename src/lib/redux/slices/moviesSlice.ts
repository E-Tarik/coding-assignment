import { createSlice } from '@reduxjs/toolkit';
import { IMovieItemModel } from '../../../types';

export const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		allMovies: [] as any,
	},
	reducers: {
		setAllMovies: (state, action) => {
			if (state?.allMovies?.results) {
				const uniqueMoviesIds = new Set(
					state.allMovies.results.map(({ id }: IMovieItemModel) => id),
				);
				const data = {
					page: action.payload?.page,
					total_pages: action.payload?.total_pages,
					total_results: action.payload?.total_results,
					results: [
						...state.allMovies.results,
						...action.payload.results.filter(
							({ id }: IMovieItemModel) => !uniqueMoviesIds.has(id),
						),
					],
				};

				return {
					...state,
					allMovies: data,
				};
			} else {
				return {
					...state,
					allMovies: action.payload,
				};
			}
		},
		clearAllMovies: (state) => {
			return {
				...state,
				allMovies: {},
			};
		},
	},
});
