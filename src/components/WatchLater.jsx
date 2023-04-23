import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import watchLaterSlice from "../data/watchLaterSlice";
import Movie from "./Movie";

import { watchLaterSelector } from "../data/selector";

import "../styles/starred.scss";

// probably can join this with starred and make it one component
export const WatchLater = ({ viewTrailer }) => {
  const dispatch = useDispatch();
  const watchLaterMovies = useSelector(watchLaterSelector);

  const { removeAllWatchLater } = watchLaterSlice.actions;

  const handleEmptyListBtnClick = () => {
    dispatch(removeAllWatchLater());
  };

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLaterMovies.length > 0 && (
        <div data-testid="watch-later-movies" className="starred-movies">
          <h6 className="header">Watch Later List</h6>
          <div className="row">
            {watchLaterMovies.map((movie) => (
              <Movie key={movie.id} movie={movie} viewTrailer={viewTrailer} />
            ))}
          </div>

          <footer className="text-center">
            <button
              className="btn btn-primary"
              onClick={handleEmptyListBtnClick}
            >
              Clear all
            </button>
          </footer>
        </div>
      )}

      {watchLaterMovies.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-heart" />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};
