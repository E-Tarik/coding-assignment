import { MoviesStateModel } from 'models';
import { MovieCard } from 'components';

import './movies.scss';

type Props = {
  movies: MoviesStateModel;
};

const Movies = ({ movies }: Props) => {
  return (
    <div className='movies-list' data-testid='movies'>
      {movies?.movies?.results?.map((movie) => {
        return <MovieCard movie={movie} key={movie.id} />;
      })}
    </div>
  );
};

export default Movies;
