import type { FC, KeyboardEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";

import "./Header.scss";

type HeaderProps = {
  searchTerm: string;
  searchMovies: (searchTerm: string) => void;
  handleHomeClick: () => void;
};

const Header: FC<HeaderProps> = ({
  searchTerm,
  searchMovies,
  handleHomeClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { starredMovies } = useAppSelector((state) => state.starred);

  const handleChange = (event: React.ChangeEvent) => {
    searchMovies((event.target as HTMLInputElement).value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && location.pathname !== "/") {
      event.preventDefault();
      navigate(`/?query=${searchTerm}`);
    }
  };

  return (
    <header>
      <Link to="/" onClick={handleHomeClick} data-testid="home">
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
          onChange={handleChange}
          value={searchTerm}
          onKeyDown={handleKeyDown}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};

export default Header;
