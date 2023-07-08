import { Link, NavLink, useSearchParams, createSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Icon } from '../../Icon';

import './header.scss';

const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { starredMovies } = useSelector(state => state.starred);

  const searchQuery = searchParams.get('search');

  const onSearchChange = e => {
    navigate({
      pathname: '/',
      search: createSearchParams({ search: e.target.value }).toString(),
    });
  };

  return (
    <header>
      <Link to="/" data-testid="home">
        <Icon iconName="film" width="1.2rem" height="1.2rem" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          <Icon
            iconName={starredMovies.length > 0 ? 'star-fill' : 'star'}
            width="1.2rem"
            height="1.2rem"
          />
          {starredMovies.length > 0 && <sup className="star-number">{starredMovies.length}</sup>}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav" data-testid="nav-watch-later">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          value={searchQuery || ''}
          onChange={onSearchChange}
          type="search"
          data-testid="search-movies"
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};

export { Header };
