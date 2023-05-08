import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import starredSlice from 'redux/starred-slice';
import watchLaterSlice from 'redux/watch-later-slice';
import { ENDPOINT, API_KEY } from '../constants';
import { Modal, YouTubePlayer } from 'components';
import { MovieDetailsModel, MovieItemModel, StoreModel } from 'models';

type Props = {
  movie: MovieItemModel;
};

const Movie = ({ movie }: Props) => {
  const state = useSelector((state: StoreModel) => state);
  const { starred, watchLater } = state;
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  // Local States
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [cardOpened, setCardOpened] = useState<boolean>(false);
  const [videoKey, setVideoKey] = useState<null | string>(null);

  const dispatch = useDispatch();

  const handleGetMovie = async () => {
    const URL = `${ENDPOINT}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`;
    setVideoKey(null);
    setVisibleModal(true);
    const videoData: MovieDetailsModel = await fetch(URL).then((response) =>
      response.json()
    );
    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === 'Trailer'
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  const handleClickCloseButton = (e: MouseEvent) => {
    if (e.stopPropagation) e.stopPropagation();
    setCardOpened(false);
  };

  const handleHideModal = () => {
    setVisibleModal(false);
  };

  const renderStartButton = () => {
    const isStarred = starred.starredMovies
      .map((movie) => movie.id)
      .includes(movie.id);

    if (isStarred) {
      return (
        <span
          className='btn-star'
          data-testid='unstar-link'
          onClick={() => dispatch(unstarMovie(movie))}
        >
          <i className='bi bi-star-fill' data-testid='star-fill' />
        </span>
      );
    }

    return (
      <span
        className='btn-star'
        data-testid='starred-link'
        onClick={() =>
          dispatch(
            starMovie({
              id: movie.id,
              overview: movie.overview,
              release_date: movie.release_date?.substring(0, 4),
              poster_path: movie.poster_path,
              title: movie.title,
            })
          )
        }
      >
        <i className='bi bi-star' />
      </span>
    );
  };

  const renderWatchLaterButton = () => {
    const isInWatchList = watchLater.watchLaterMovies
      .map((movie) => movie.id)
      .includes(movie.id);

    if (isInWatchList) {
      return (
        <button
          type='button'
          data-testid='remove-watch-later'
          className='btn btn-light btn-watch-later blue'
          onClick={() => dispatch(removeFromWatchLater(movie))}
        >
          <i className='bi bi-check'></i>
        </button>
      );
    }

    return (
      <button
        type='button'
        data-testid='watch-later'
        className='btn btn-light btn-watch-later'
        onClick={() =>
          dispatch(
            addToWatchLater({
              id: movie.id,
              overview: movie.overview,
              release_date: movie.release_date?.substring(0, 4),
              poster_path: movie.poster_path,
              title: movie.title,
            })
          )
        }
      >
        Watch Later
      </button>
    );
  };

  return (
    <div
      className={clsx('card', {
        opened: cardOpened,
      })}
      onClick={() => setCardOpened(true)}
    >
      <div className='card-body text-center'>
        <div className='overlay' />
        <div className='info_panel'>
          <div className='overview'>{movie.overview}</div>
          <div className='year'>{movie.release_date?.substring(0, 4)}</div>

          {renderStartButton()}
          {renderWatchLaterButton()}

          <button
            type='button'
            className='btn btn-dark'
            onClick={() => handleGetMovie()}
          >
            View Trailer
          </button>
        </div>
        <img
          className='center-block'
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : 'assets/not-found-500X750.jpeg'
          }
          alt='Movie poster'
        />
      </div>
      <h6 className='title mobile-card'>{movie.title}</h6>
      <h6 className='title'>{movie.title}</h6>
      <button
        type='button'
        className='close'
        onClick={(e) => handleClickCloseButton(e)}
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>

      <Modal visible={visibleModal} onClose={handleHideModal}>
        <YouTubePlayer videoKey={videoKey} />
      </Modal>
    </div>
  );
};

export default Movie;
