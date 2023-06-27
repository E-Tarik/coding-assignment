import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../styles/starred.scss'

function WatchLater ({ children, watchLaterCount, onRemoveAll }) {
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
            {children}
          </div>

          <footer className="text-center">
            <button
              className="btn btn-primary"
              onClick={onRemoveAll}
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onRemoveAll: PropTypes.func.isRequired,
  watchLaterCount: PropTypes.number.isRequired
}

export default WatchLater
