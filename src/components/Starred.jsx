import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import Movies from './Movies'
import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import '../styles/starred.scss'

const { clearAllStarred } = starredSlice.actions

function Starred () {
  const starredList = useSelector((state) => state.starred.starredMovies)

  const dispatch = useDispatch()

  const starredCount = starredList.length

  const onClearStarred = useCallback(() => {
    dispatch(clearAllStarred())
  }, [dispatch])

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
            <Movies
              movies={starredList}
            />
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

export default Starred
