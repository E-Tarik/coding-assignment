import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import '../styles/header.scss'

function Header ({ searchMovies }) {
  const navigate = useNavigate()
  const starredList = useSelector((state) => state.starred.starredMovies)
  const starredCount = starredList.length

  const onFocus = useCallback(() => {
    navigate('/')
  }, [])

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
          onChange={onClick}
          onFocus={onFocus}
          placeholder="Search movies..."
          type="search"
        />
      </div>
    </header>
  )
}

Header.propTypes = {
  searchMovies: PropTypes.func.isRequired
}

export default Header
