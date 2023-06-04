import { useCallback, useState } from 'react';
import placeholder from '../assets/not-found-500X750.jpeg';
import { WatchLaterButton } from './global/WatchLaterButton';
import { StarButton } from './global/StarButton';
import { Modal } from './Modal';
import YouTubePlayer from './YoutubePlayer';
import { useTrailer } from '../hooks/useTrailer';

const Movie = ({ movie }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isModalOpen, setIsModalOpened] = useState(false);
  const { videoKey, getMovie } = useTrailer(movie.id);

  const handleViewTrailer = useCallback(() => {
    getMovie();
    setIsModalOpened(true);
  }, [getMovie]);

  return (
    <>
      {isModalOpen ? (
        <Modal closeModal={() => setIsModalOpened(false)}>
          <YouTubePlayer videoKey={videoKey} />
        </Modal>
      ) : null}
      <div
        className={`card ${isOpened ? 'opened' : ''}`}
        onClick={() => setIsOpened(true)}
      >
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            <StarButton movie={movie} />
            <WatchLaterButton movie={movie} />
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleViewTrailer}
            >
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
        <button
          type="button"
          className="close"
          onClick={(e) => {
            setIsOpened(false);
            e.stopPropagation();
          }}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
};

export default Movie;
