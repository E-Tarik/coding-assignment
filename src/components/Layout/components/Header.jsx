import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Icon } from '../../Icon';

import '../../../styles/header.scss';

const Header = ({ searchMovies }) => {
  const { starredMovies } = useSelector(state => state.starred);

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies('')}>
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
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" onClick={e => searchMovies('')} className="search-link">
          <input
            type="search"
            data-testid="search-movies"
            onKeyUp={e => searchMovies(e.target.value)}
            className="form-control rounded"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
          />
        </Link>
      </div>
    </header>
  );
};

export { Header };
