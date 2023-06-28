import React, { useCallback, useState, memo } from 'react'
import PropTypes from 'prop-types'
import watchLaterSlice from '../data/watchLaterSlice'
import starredSlice from '../data/starredSlice'
import playerSlice from '../data/playerSlice'
import { useDispatch } from 'react-redux'
import placeholder from '../assets/not-found-500X750.jpeg'

const { toggleWatchLater } = watchLaterSlice.actions
const { toggleStar } = starredSlice.actions
const { setCurrentMovieId } = playerSlice.actions

function Movie ({ movie, isStarred, isSavedToWatch }) {
  const [opened, setOpened] = useState(false)

  const dispatch = useDispatch()

  const onStarClick = useCallback(() => {
    dispatch(toggleStar(movie))
  }, [dispatch, toggleStar, movie])

  const onWatchLaterButtonClick = useCallback(() => {
    dispatch(toggleWatchLater(movie))
  }, [dispatch, toggleWatchLater, movie])

  const onCardOpened = useCallback(() => {
    setOpened(true)
  })

  const onCardClose = useCallback((event) => {
    event.stopPropagation()
    setOpened(false)
  })

  const onViewTrailer = useCallback(() => {
    dispatch(setCurrentMovieId(movie.id))
  }, [dispatch, setCurrentMovieId, movie])

  return (
    <div className="wrapper col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2">
      <div
        className={`card${opened ? ' opened' : ''}`}
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
              onClick={onStarClick}
            >
              <i
                className={`bi bi-star${isStarred ? '-fill' : ''}`}
                data-testid={isStarred ? 'star-fill' : undefined}
              />
            </span>

            <button
              className={`btn btn-light btn-watch-later${isSavedToWatch ? ' blue' : ''}`}
              data-testid={isSavedToWatch ? 'remove-watch-later' : 'watch-later'}
              onClick={onWatchLaterButtonClick}
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
  }).isRequired
}

export default memo(Movie)
