import { useDispatch, useSelector } from "react-redux";

import starredSlice from "../data/starredSlice";
import watchLaterSlice from "../data/watchLaterSlice";
import placeholder from "../assets/not-found-500X750.jpeg";
import { starredMoviesSelector, watchLaterSelector } from "../data/selector";
import { getMovieMetadata } from "../utils/utils";
import { forwardRef } from "react";

const Movie = forwardRef(({ movie, viewTrailer }, ref) => {
  const dispatch = useDispatch();
  const starred = useSelector(starredMoviesSelector);
  const watchLater = useSelector(watchLaterSelector);
  const metadata = getMovieMetadata(movie);
  const isInStarred = starred.map((movie) => movie.id).includes(movie.id);
  const isInWatchLater = watchLater.map((movie) => movie.id).includes(movie.id);
  const { starMovie, unstarMovie } = starredSlice.actions;

  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  const handleStarMovieBtnClick = () => {
    dispatch(starMovie(metadata));
  };
  const handleWatchLaterBtnClick = (movie) => {
    dispatch(addToWatchLater(movie));
  };
  const handleRemoveFromListBtnClick = (movie) => {
    dispatch(removeFromWatchLater(movie));
  };
  const handleOpenMovieCard = (e) => {
    e?.currentTarget.classList.add("opened");
  };
  const handleCloseMovieCard = (e) => {
    e?.preventDefault();
    e?.target.parentElement.parentElement.classList.remove("opened");
  };

  return (
    <div
      className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2"
      ref={ref}
    >
      <div className="card" onClick={handleOpenMovieCard}>
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{metadata.release_date}</div>
            {!isInStarred ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={() => handleStarMovieBtnClick(movie)}
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                className="btn-star"
                data-testid="unstar-link"
                onClick={() => dispatch(unstarMovie(movie))}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!isInWatchLater ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={() => handleWatchLaterBtnClick(movie)}
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={() => handleRemoveFromListBtnClick(movie)}
              >
                <i className="bi bi-check" />
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => viewTrailer(movie)}
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
            alt={`Movie Poster for ${movie.title}`}
          />
        </div>
        {/* mobile */}
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={(e) => handleCloseMovieCard(e)}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
});

export default Movie;
