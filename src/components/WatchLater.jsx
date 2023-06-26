import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import watchLaterSlice from '../data/watchLaterSlice'
import Movie from './Movie'
import '../styles/starred.scss'

function WatchLater ({ viewTrailer }) {
  const state = useSelector((state) => state)
  const { watchLater } = state
  const { removeAllWatchLater } = watchLaterSlice.actions
  const dispatch = useDispatch()

  const onRemoveAllWatchLater = useCallback(() => {
    dispatch(removeAllWatchLater())
  }, [dispatch, removeAllWatchLater])

  return (
    <div
      className="starred"
      data-testid="watch-later-div"
    >
      {watchLater.watchLaterMovies.length > 0 && (
        <div
          className="starred-movies"
          data-testid="watch-later-movies"
        >
          <h6 className="header">
            Watch Later List
          </h6>

          <div className="row">
            {watchLater.watchLaterMovies.map((movie) => (
              <Movie
                key={movie.id}
                movie={movie}
                viewTrailer={viewTrailer}
              />
            ))}
          </div>

          <footer className="text-center">
            <button
              className="btn btn-primary"
              onClick={onRemoveAllWatchLater}
              type="button"
            >
              Empty list
            </button>
          </footer>
        </div>
      )}

      {watchLater.watchLaterMovies.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-heart" />

          <p>
            You have no movies saved to watch later.
          </p>

          <p>
            Go to
            <Link to='/'>
              Home
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}

WatchLater.propTypes = {
  viewTrailer: PropTypes.func.isRequired
}

export default WatchLater
