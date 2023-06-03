import { useDispatch, useSelector } from 'react-redux';
import watchLaterSlice from '../../data/watchLaterSlice';

const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

export function WatchLaterButton({ movie }) {
  const isWatchLater = useSelector(
    (state) =>
      !!state.watchLater.watchLaterMovies.find(({ id }) => id === movie.id)
  );
  const dispatch = useDispatch();

  if (isWatchLater) {
    return (
      <button
        type="button"
        data-testid="remove-watch-later"
        className="btn btn-light btn-watch-later blue"
        onClick={() => dispatch(removeFromWatchLater(movie.id))}
      >
        <i className="bi bi-check"></i>
      </button>
    );
  } else {
    return (
      <button
        type="button"
        data-testid="watch-later"
        className="btn btn-light btn-watch-later"
        onClick={() => dispatch(addToWatchLater(movie))}
      >
        Watch Later
      </button>
    );
  }
}
