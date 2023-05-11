import { MovieItemModel } from 'models';
import { MovieCard, Spinner } from 'components';
import { useSelector } from 'react-redux';

import { moviesSelector } from 'redux/selectors';

import './movies.scss';

type Props = {
  isLoading: boolean;
  hasNextPage: boolean;
  lastMovieRef: (movie: HTMLDivElement) => void;
};

const Movies = ({ isLoading, hasNextPage, lastMovieRef }: Props) => {
  const moviesData = useSelector(moviesSelector.selectAll);

  const content = moviesData?.results?.map(
    (movie: MovieItemModel, index: number) => {
      if (moviesData?.results?.length === index + 1) {
        return <MovieCard ref={lastMovieRef} key={movie.id} movie={movie} />;
      }
      return <MovieCard key={movie.id} movie={movie} />;
    }
  );

  return (
    <>
      <div className='movies-list' data-testid='movies'>
        {content}
      </div>

      {isLoading && <Spinner />}

      {!hasNextPage && !isLoading && (
        <div className='end-of-list'>End of the list</div>
      )}

      <div className='back-to-top'>
        <a href='#top'>
          <i className='bi bi-chevron-up'></i>
        </a>
      </div>
    </>
  );
};

export default Movies;
