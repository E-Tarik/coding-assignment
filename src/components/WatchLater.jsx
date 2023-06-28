import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Movies from './Movies'
import watchLaterSlice from '../data/watchLaterSlice'
import '../styles/starred.scss'

const { removeAllWatchLater } = watchLaterSlice.actions

function WatchLater ({ viewTrailer, onCloseCard }) {
  const watchLaterList = useSelector((state) => state.watchLater.watchLaterMovies)

  const watchLaterCount = watchLaterList.length

  const dispatch = useDispatch()

  const onRemoveAllWatchLater = useCallback(() => {
    dispatch(removeAllWatchLater())
  }, [dispatch])

  return (
    <div
      className="starred"
      data-testid="watch-later-div"
    >
      {watchLaterCount > 0 && (
        <div
          className="starred-movies"
          data-testid="watch-later-movies"
        >
          <h6 className="header">
            Watch Later List
          </h6>

          <div className="row">
            <Movies
              closeCard={onCloseCard}
              movies={watchLaterList}
              viewTrailer={viewTrailer}
            />
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

      {watchLaterCount === 0 && (
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
  onCloseCard: PropTypes.func.isRequired,
  viewTrailer: PropTypes.func.isRequired
}

export default WatchLater
