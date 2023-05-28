export interface IMoviesResponseModel<T> {
	page: number;
	results: T;
	total_pages: number;
	total_results: number;
}

export interface IMovieItemModel {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: 8.4;
	vote_count: 33626;
}

export interface IMoviesModel {
	page: number;
	movies: IMoviesResponseModel<IMovieItemModel[]>;
}
