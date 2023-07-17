import classNames from 'classnames'
import { forwardRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import placeholder from '../assets/not-found-500X750.jpeg'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'

const Movie = forwardRef(({ movie, viewTrailer, closeCard }, ref) => {
  const { starred, watchLater } = useSelector((state) => state)
  const { starMovie, unstarMovie } = starredSlice.actions
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions
  const [opened, toggleOpened] = useState(false)

  const dispatch = useDispatch()

  const isMovieStarred =
    starred.starredMovies.filter((starredMovie) => starredMovie.id === movie.id)
      .length > 0

  const isInWatchLater =
    watchLater.watchLaterMovies.filter(
      (watchLaterItem) => watchLaterItem.id === movie.id
    ).length > 0

  const myClickHandler = (e) => {
    e.stopPropagation()
    toggleOpened(false)
  }

  return (
    <div className="wrapper" ref={ref}>
      <div
        className={classNames('card', { opened })}
        onClick={() => toggleOpened(true)}
      >
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!isMovieStarred ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={() => dispatch(starMovie(movie))}
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
                onClick={() => dispatch(addToWatchLater(movie))}
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
                <i className="bi bi-check"></i>
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
            alt="Movie poster"
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={(e) => myClickHandler(e)}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
})

export default Movie
