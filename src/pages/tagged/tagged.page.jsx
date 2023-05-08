import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import watchLaterSlice from '../../redux/watch-later-slice';
import starredSlice from '../../redux/starred-slice';
import { MovieCard } from '../../components';

import './tagged.scss';

const TaggedPage = ({ pageType }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { watchLater, starred } = state;

  const { removeAllWatchLater } = watchLaterSlice.actions;
  const { clearAllStarred } = starredSlice.actions;

  if (pageType === 'starred') {
    return (
      <div className='starred' data-testid='starred'>
        {starred.starredMovies.length > 0 && (
          <div data-testid='starred-movies' className='starred-movies'>
            <h6 className='header'>Starred movies</h6>
            <div className='row'>
              {starred.starredMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>

            <footer className='text-center'>
              <button
                className='btn btn-primary'
                onClick={() => dispatch(clearAllStarred())}
              >
                Remove all starred
              </button>
            </footer>
          </div>
        )}

        {starred.starredMovies.length === 0 && (
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
      {watchLater.watchLaterMovies.length > 0 && (
        <div data-testid='watch-later-movies' className='starred-movies'>
          <h6 className='header'>Watch Later List</h6>
          <div className='row'>
            {watchLater.watchLaterMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          <footer className='text-center'>
            <button
              className='btn btn-primary'
              onClick={() => dispatch(removeAllWatchLater())}
            >
              Empty list
            </button>
          </footer>
        </div>
      )}

      {watchLater.watchLaterMovies.length === 0 && (
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
