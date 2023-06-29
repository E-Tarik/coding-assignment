import React, { useCallback } from 'react'
import debounce from 'lodash/debounce'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import moviesSlice from '../data/moviesSlice'
import { useSelector, useDispatch } from 'react-redux'

import '../styles/header.scss'

const { updateQuery } = moviesSlice.actions

function Header () {
  const navigate = useNavigate()
  const starredList = useSelector((state) => state.starred.starredMovies)
  const starredCount = starredList.length
  const dispatch = useDispatch()

  const onInputFocus = useCallback(() => {
    navigate('/')
  }, [])

  const onInputChange = debounce((event) => {
    dispatch(updateQuery(event.target.value))
  }, 300)

  const resetMovies = useCallback(() => {
    dispatch(updateQuery(''))
  }, [])

  return (
    <header>
      <Link
        data-testid="home"
        onClick={resetMovies}
        to="/"
      >
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          className="nav-starred"
          data-testid="nav-starred"
          to="/starred"
        >
          <i
            className={`bi bi-star${starredCount > 0 ? '-fill bi-star-fill-white' : ''}`}
          />

          {starredCount > 0
            ? (
              <sup className="star-number">
                {starredCount}
              </sup>
            )
            : null}
        </NavLink>

        <NavLink
          className="nav-fav"
          data-testid="watch-later"
          to="/watch-later"
        >
          Watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          aria-describedby="search-addon"
          aria-label="Search movies"
          className="form-control rounded"
          data-testid="search-movies"
          onChange={onInputChange}
          onFocus={onInputFocus}
          placeholder="Search movies..."
          type="search"
        />
      </div>
    </header>
  )
}

export default Header
