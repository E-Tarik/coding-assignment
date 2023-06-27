import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../styles/starred.scss'

function Starred ({ children, starredCount, onRemoveAll }) {
  return (
    <div
      className="starred"
      data-testid="starred"
    >
      {starredCount > 0 && (
        <div
          className="starred-movies"
          data-testid="starred-movies"
        >
          <h6 className="header">
            Starred movies
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
              Remove all starred
            </button>
          </footer>
        </div>)}

      {starredCount === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-star" />

          <p>
            There are no starred movies.
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

Starred.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onRemoveAll: PropTypes.func.isRequired,
  starredCount: PropTypes.number.isRequired
}

export default Starred
