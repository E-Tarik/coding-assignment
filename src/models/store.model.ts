import { MovieItemModel, ResponseModel } from '.';

export interface NewMoviesStateModel {
  all: ResponseModel<MovieItemModel[]>;
  favorites: MovieItemModel[];
  watchLater: MovieItemModel[];
}
export interface StoreModel {
  movies: NewMoviesStateModel;
}
