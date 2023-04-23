import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Movie from "./Movie";
import starredSlice from "../data/starredSlice";
import { starredMoviesSelector } from "../data/selector";
import "../styles/starred.scss";

export const Starred = ({ viewTrailer }) => {
  const starred = useSelector(starredMoviesSelector);
  const { clearAllStarred } = starredSlice.actions;
  const dispatch = useDispatch();
  const handleClearStarredBtnClick = () => {
    dispatch(clearAllStarred());
  };
  return (
    <div className="starred" data-testid="starred">
      {starred.length > 0 && (
        <div data-testid="starred-movies" className="starred-movies">
          <h6 className="header">Starred movies</h6>
          <div className="row">
            {starred.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>

          <footer className="text-center">
            <button
              className="btn btn-primary"
              onClick={handleClearStarredBtnClick}
            >
              Remove all starred
            </button>
          </footer>
        </div>
      )}

      {starred.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-star" />
          <p>There are no starred movies.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};
