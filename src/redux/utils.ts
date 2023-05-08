import { MovieItemModel } from 'models';

export const findMovieItem = (state: MovieItemModel[], id: number) => {
  const indexOfId = state?.findIndex((key: MovieItemModel) => key.id === id);
  return indexOfId;
};
