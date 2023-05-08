import {
  MoviesStateModel,
  StarredMoviesStateModel,
  WatchLaterMoviesStateModel,
} from '.';

export interface StoreModel {
  movies: MoviesStateModel;
  starred: StarredMoviesStateModel;
  watchLater: WatchLaterMoviesStateModel;
}
