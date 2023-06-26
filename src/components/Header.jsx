import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import '../styles/header.scss'

function Header ({ searchMovies }) {
  const { starredMovies } = useSelector((state) => state.starred)

  const onClick = useCallback((event) => {
    searchMovies(event.currentTarget.value)
  }, [searchMovies])

  const resetMovies = useCallback(() => {
    searchMovies('')
  }, [searchMovies])

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
          {starredMovies.length > 0
            ? (
              <>
                <i className="bi bi-star-fill bi-star-fill-white" />

                <sup className="star-number">
                  {starredMovies.length}
                </sup>
              </>
            )
            : (
              <i className="bi bi-star" />
            )}
        </NavLink>

        <NavLink
          className="nav-fav"
          to="/watch-later"
        >
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link
          className="search-link"
          onClick={resetMovies}
          to="/"
        >
          <input
            aria-describedby="search-addon"
            aria-label="Search movies"
            className="form-control rounded"
            data-testid="search-movies"
            onKeyUp={onClick}
            placeholder="Search movies..."
            type="search"
          />
        </Link>
      </div>
    </header>
  )
}
Header.propTypes = {
  searchMovies: PropTypes.func.isRequired
}

export default Header
