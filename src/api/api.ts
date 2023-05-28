// Core
import axios from 'axios';

// Instruments
import { ROOT_URL, API_KEY } from './config';

export const api = {
	movies: {
		async fetchMovies(url: string) {
			return await axios.get(url);
		},
		async getMovieById(movieId: string) {
			return await axios.get(
				`${ROOT_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`,
			);
		},
	},
};
