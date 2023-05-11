import { MouseEvent, useState, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { ENDPOINT, API_KEY } from '../constants';
import { Modal, YouTubePlayer } from 'components';
import { MovieDetailsModel, MovieItemModel } from 'models';
import { useAppDispatch } from 'hooks';
import {
  addToFavorites,
  removeFromFavorites,
  addToWatchLater as addToWatchLaterList,
  removeFromWatchLater as removeFromWatchLaterList,
} from 'redux/slices/movies-slice';
import { moviesSelector } from 'redux/selectors';

type Props = {
  movie: MovieItemModel;
};

const Movie = forwardRef(({ movie }: Props, ref: any) => {
  const favorites = useSelector(moviesSelector.selectFavorites);
  const watchLater = useSelector(moviesSelector.selectWatchLater);

  const dispatch = useAppDispatch();

  // Local States
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [cardOpened, setCardOpened] = useState<boolean>(false);
  const [videoKey, setVideoKey] = useState<null | string>(null);

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
    const isStarred = favorites.map((movie) => movie.id).includes(movie.id);

    if (isStarred) {
      return (
        <span
          className='btn-star'
          data-testid='unstar-link'
          onClick={() => {
            dispatch(removeFromFavorites(movie));
          }}
        >
          <i className='bi bi-star-fill' data-testid='star-fill' />
        </span>
      );
    }

    return (
      <span
        className='btn-star'
        data-testid='starred-link'
        onClick={() => {
          dispatch(
            addToFavorites({
              id: movie.id,
              overview: movie.overview,
              release_date: movie.release_date?.substring(0, 4),
              poster_path: movie.poster_path,
              title: movie.title,
            })
          );
        }}
      >
        <i className='bi bi-star' />
      </span>
    );
  };

  const renderWatchLaterButton = () => {
    const isInWatchList = watchLater
      .map((movie) => movie.id)
      .includes(movie.id);

    if (isInWatchList) {
      return (
        <button
          type='button'
          data-testid='remove-watch-later'
          className='btn btn-light btn-watch-later blue'
          onClick={() => {
            dispatch(removeFromWatchLaterList(movie));
          }}
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
        onClick={() => {
          dispatch(
            addToWatchLaterList({
              id: movie.id,
              overview: movie.overview,
              release_date: movie.release_date?.substring(0, 4),
              poster_path: movie.poster_path,
              title: movie.title,
            })
          );
        }}
      >
        Watch Later
      </button>
    );
  };

  const renderContent = (
    <>
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
    </>
  );

  const content = ref ? (
    <div
      className={clsx('card', {
        opened: cardOpened,
      })}
      ref={ref}
      onClick={() => setCardOpened(true)}
    >
      {renderContent}
    </div>
  ) : (
    <div
      className={clsx('card', {
        opened: cardOpened,
      })}
      onClick={() => setCardOpened(true)}
    >
      {renderContent}
    </div>
  );

  return content;
});

export default Movie;
