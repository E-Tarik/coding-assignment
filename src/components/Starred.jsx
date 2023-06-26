import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import Movie from './Movie'
import '../styles/starred.scss'

function Starred ({ viewTrailer }) {
  const state = useSelector((state) => state)
  const { starred } = state
  const { clearAllStarred } = starredSlice.actions
  const dispatch = useDispatch()

  const onClearStarred = useCallback(() => {
    dispatch(clearAllStarred())
  }, [dispatch, clearAllStarred])

  return (
    <div
      className="starred"
      data-testid="starred"
    >
      {starred.starredMovies.length > 0 && (
        <div
          className="starred-movies"
          data-testid="starred-movies"
        >
          <h6 className="header">
            Starred movies
          </h6>

          <div className="row">
            {starred.starredMovies.map((movie) => (
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
              onClick={onClearStarred}
              type="button"
            >
              Remove all starred
            </button>
          </footer>
        </div>)}

      {starred.starredMovies.length === 0 && (
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
  viewTrailer: PropTypes.func.isRequired
}

export default Starred
