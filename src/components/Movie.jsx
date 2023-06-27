import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'

function Movie ({ movie, viewTrailer, isStarred, isSavedToWatchLater }) {
  const { starMovie, unstarMovie } = starredSlice.actions
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

  const movieDataToRender = {
    ...movie,
    release_date: movie.release_date?.substring?.(0, 4)
  }

  const dispatch = useDispatch()

  const onCardOpened = useCallback((event) => {
    event.currentTarget.classList.add('opened')
  })

  const onCardClose = useCallback((event) => {
    event.target.parentElement.parentElement.classList.remove('opened')
  })

  const onViewTrailer = useCallback(() => {
    viewTrailer(movie)
  }, [viewTrailer, movie])

  const onStarClick = useCallback(() => {
    const action = isStarred ? unstarMovie : starMovie
    dispatch(action(movieDataToRender))
  }, [dispatch, starMovie, unstarMovie, isStarred, movieDataToRender])

  const onWatchLaterButtonClick = useCallback(() => {
    const action = isSavedToWatchLater ? removeFromWatchLater : addToWatchLater
    dispatch(action(movieDataToRender))
  }, [dispatch, addToWatchLater, removeFromWatchLater, movieDataToRender, isSavedToWatchLater])

  return (
    <div className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2">
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
              {movieDataToRender.release_date}
            </div>

            <span
              className="btn-star"
              data-testid={isStarred ? 'unstar-link' : 'starred-link'}
              onClick={onStarClick}
            >
              <i
                className={`bi bi-star${isStarred ? '-fill' : ''}`}
                data-testid={isStarred ? 'star-fill' : undefined}
              />
            </span>

            <button
              className={`btn btn-light btn-watch-later${isSavedToWatchLater ? ' blue' : ''}`}
              data-testid={isSavedToWatchLater ? 'remove-watch-later' : 'watch-later'}
              onClick={onWatchLaterButtonClick}
              type="button"
            >
              {isSavedToWatchLater
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
            src={(movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder}
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
  isSavedToWatchLater: PropTypes.bool,
  isStarred: PropTypes.bool,
  movie: PropTypes.shape({
    id: PropTypes.number,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  viewTrailer: PropTypes.func.isRequired
}

Movie.defaultProps = {
  isSavedToWatchLater: false,
  isStarred: false
}

export default Movie
