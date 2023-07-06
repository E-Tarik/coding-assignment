import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'clsx';

import starredSlice from '../../data/starredSlice';
import watchLaterSlice from '../../data/watchLaterSlice';
import placeholder from '../../assets/not-found-500X750.jpeg';
import { Icon } from '../Icon';
import { useTrailerDialog } from '../TrailerDialog/useTrailerDialog';

const Movie = ({ movie }) => {
  const [cardIsOpened, setCardIsOpened] = useState(false);
  const state = useSelector(state => state);
  const { starred, watchLater } = state;
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
  const { viewTrailer, component: trailerDialog } = useTrailerDialog();

  const dispatch = useDispatch();

  const onCloseCard = e => {
    e.stopPropagation();
    setCardIsOpened(false);
  };

  return (
    <>
      {trailerDialog}
      <div className="wrapper">
        <div className={cx('card', { opened: cardIsOpened })} onClick={() => setCardIsOpened(true)}>
          <div className="card-body text-center">
            <div className="overlay" />
            <div className="info_panel">
              <div className="overview">{movie.overview}</div>
              <div className="year">{movie.release_date?.substring(0, 4)}</div>
              {!starred.starredMovies.map(movie => movie.id).includes(movie.id) ? (
                <span
                  className="btn-star"
                  data-testid="starred-link"
                  onClick={() =>
                    dispatch(
                      starMovie({
                        id: movie.id,
                        overview: movie.overview,
                        release_date: movie.release_date?.substring(0, 4),
                        poster_path: movie.poster_path,
                        title: movie.title,
                      }),
                    )
                  }
                >
                  <Icon iconName="star" />
                </span>
              ) : (
                <span
                  className="btn-star"
                  data-testid="unstar-link"
                  onClick={() => dispatch(unstarMovie(movie))}
                >
                  <Icon iconName="star-fill" data-testid="star-fill" />
                </span>
              )}
              {!watchLater.watchLaterMovies.map(movie => movie.id).includes(movie.id) ? (
                <button
                  type="button"
                  data-testid="watch-later"
                  className="btn btn-light btn-watch-later"
                  onClick={() =>
                    dispatch(
                      addToWatchLater({
                        id: movie.id,
                        overview: movie.overview,
                        release_date: movie.release_date?.substring(0, 4),
                        poster_path: movie.poster_path,
                        title: movie.title,
                      }),
                    )
                  }
                >
                  Watch Later
                </button>
              ) : (
                <button
                  type="button"
                  data-testid="remove-watch-later"
                  className="btn btn-light btn-watch-later blue"
                  onClick={() => dispatch(removeFromWatchLater(movie))}
                >
                  <Icon iconName="check" width="0.6rem" height="0.6rem" />
                </button>
              )}
              <button type="button" className="btn btn-dark" onClick={() => viewTrailer(movie)}>
                View Trailer
              </button>
            </div>
            <img
              className="center-block"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : placeholder
              }
              alt="Movie poster"
            />
          </div>
          <h6 className="title mobile-card">{movie.title}</h6>
          <h6 className="title">{movie.title}</h6>
          <button type="button" className="close" onClick={onCloseCard} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export { Movie };
