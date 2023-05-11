import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MovieCard } from 'components';
import { useAppDispatch } from 'hooks';
import {
  removeAllFavorites,
  removeAllWatchLater as removeAllWatchLaterList,
} from 'redux/slices/movies-slice';
import { moviesSelector } from 'redux/selectors';

import './tagged.scss';

type Props = {
  pageType: string;
};

const TaggedPage = ({ pageType }: Props) => {
  const appDispatch = useAppDispatch();

  const favorites = useSelector(moviesSelector.selectFavorites);
  const watchLater = useSelector(moviesSelector.selectWatchLater);

  if (pageType === 'starred') {
    return (
      <div className='starred' data-testid='starred'>
        {favorites.length > 0 && (
          <div data-testid='starred-movies' className='starred-movies'>
            <h6 className='header'>Starred movies</h6>
            <div className='movies-list'>
              {favorites.map((movie: any) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>

            <footer className='text-center'>
              <button
                className='btn btn-primary'
                onClick={() => {
                  appDispatch(removeAllFavorites());
                }}
              >
                Remove all starred
              </button>
            </footer>
          </div>
        )}

        {favorites.length === 0 && (
          <div className='text-center empty-cart'>
            <i className='bi bi-star' />
            <p>There are no starred movies.</p>
            <p>
              Go to <Link to='/'>Home</Link>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='starred' data-testid='watch-later-div'>
      {watchLater.length > 0 && (
        <div data-testid='watch-later-movies' className='starred-movies'>
          <h6 className='header'>Watch Later List</h6>
          <div className='movies-list'>
            {watchLater.map((movie: any) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          <footer className='text-center'>
            <button
              className='btn btn-primary'
              onClick={() => {
                appDispatch(removeAllWatchLaterList());
              }}
            >
              Empty list
            </button>
          </footer>
        </div>
      )}

      {watchLater.length === 0 && (
        <div className='text-center empty-cart'>
          <i className='bi bi-heart' />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to='/'>Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default TaggedPage;
