import '../styles/header.scss'

import { useSelector } from 'react-redux'
import { Link, NavLink, useSearchParams } from 'react-router-dom'

const Header = () => {
  const { starredMovies } = useSelector((state) => state.starred)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchValue = searchParams.get('search')

  const handleSearch = (e) => {
    if (e.target.value) {
      setSearchParams({ search: e.target.value })
      return
    }
    setSearchParams()
  }

  return (
    <header>
      <Link to="/" data-testid="home">
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          value={searchValue || ''}
          onChange={handleSearch}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  )
}

export default Header
