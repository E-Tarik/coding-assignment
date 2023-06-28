import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import placeholder from '../assets/not-found-500X750.jpeg'

function Movie ({ movie, viewTrailer, isStarred, isSavedToWatch, onStarClick, onWatchLaterButtonClick }) {
  const onStar = useCallback(() => {
    onStarClick(movie)
  }, [onStarClick, movie])

  const onWatchLater = useCallback(() => {
    onWatchLaterButtonClick(movie)
  }, [onWatchLaterButtonClick, movie])

  const onCardOpened = useCallback((event) => {
    event.currentTarget.classList.add('opened')
  })

  const onCardClose = useCallback((event) => {
    event.target.parentElement.parentElement.classList.remove('opened')
  })

  const onViewTrailer = useCallback(() => {
    viewTrailer(movie)
  }, [viewTrailer, movie])

  return (
    <div className="wrapper col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2">
      <div
        className="card"
        onClick={onCardOpened}
      >
        <div className="card-body text-center">
          <div className="overlay" />

          <div className="info_panel">
            <div className="overview">
              {movie.overview}
            </div>

            <div className="year">
              {movie.releaseDate}
            </div>

            <span
              className="btn-star"
              data-testid={isStarred ? 'unstar-link' : 'starred-link'}
              onClick={onStar}
            >
              <i
                className={`bi bi-star${isStarred ? '-fill' : ''}`}
                data-testid={isStarred ? 'star-fill' : undefined}
              />
            </span>

            <button
              className={`btn btn-light btn-watch-later${isSavedToWatch ? ' blue' : ''}`}
              data-testid={isSavedToWatch ? 'remove-watch-later' : 'watch-later'}
              onClick={onWatchLater}
              type="button"
            >
              {isSavedToWatch
                ? (
                  <i className="bi bi-check" />
                )
                : 'Watch Later' }
            </button>

            <button
              className="btn btn-dark"
              onClick={onViewTrailer}
              type="button"
            >
              View Trailer
            </button>
          </div>

          <img
            alt="Movie poster"
            className="center-block"
            src={(movie.posterPath) ? `https://image.tmdb.org/t/p/w500/${movie.posterPath}` : placeholder}
          />
        </div>

        <h6 className="title mobile-card">
          {movie.title}
        </h6>

        <h6 className="title">
          {movie.title}
        </h6>

        <button
          aria-label="Close"
          className="close"
          onClick={onCardClose}
          type="button"
        >
          <span aria-hidden="true">
            &times;
          </span>
        </button>
      </div>
    </div>
  )
}

Movie.propTypes = {
  isSavedToWatch: PropTypes.bool.isRequired,
  isStarred: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    posterPath: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  onStarClick: PropTypes.func.isRequired,
  onWatchLaterButtonClick: PropTypes.func.isRequired,
  viewTrailer: PropTypes.func.isRequired
}

export default Movie
