export interface ResponseModel<T> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

export interface MovieItemModel {
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

export interface StarredMoviesStateModel {
  starredMovies: MovieItemModel[];
}

export interface WatchLaterMoviesStateModel {
  watchLaterMovies: MovieItemModel[];
}

export interface MovieDetailsCollectionModel {
  id: 4246;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface MovieDetailsGenersModel {
  id: number;
  name: string;
}

export interface MovieDetailsCountriesModel {
  iso_3166_1: string;
  name: string;
}

export interface MovieDetailsCompaniesModel {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface MovieDetailsLanguagesModel {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetailsVideoResultModel {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
export interface MovieDetailsVideosModel {
  results: MovieDetailsVideoResultModel[];
}

export interface MovieDetailsModel {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: MovieDetailsCollectionModel;
  budget: number;
  genres: MovieDetailsGenersModel[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: MovieDetailsCompaniesModel[];
  production_countries: MovieDetailsCountriesModel[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: MovieDetailsLanguagesModel[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: MovieDetailsVideosModel
}

export enum FetchStatusEnum {
  SUCCESS = 'success',
  LOADING = 'loading',
  ERROR = 'error',
}

export interface MoviesStateModel {
  movies: ResponseModel<MovieItemModel[]>;
  fetchStatus: string;
}
