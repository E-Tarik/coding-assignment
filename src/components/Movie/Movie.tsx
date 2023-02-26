import type { FC } from "react";
import { Movie as TMovie } from "../../core/types/movie.type";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { starMovie, unstarMovie } from "../../store/slice/starred.slice";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "../../store/slice/watchLater.slice";

import "./Movie.scss";

type MovieProps = {
  movie: TMovie;
  viewTrailer: (movie: TMovie) => void;
};

const Movie: FC<MovieProps> = ({ movie, viewTrailer }) => {
  const { starred, watchLater } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  return (
    <div className="wrapper">
      <div className="card">
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!starred.starredMovies
              .map((movie) => movie.id)
              .includes(movie.id) ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={() =>
                  dispatch(
                    starMovie({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  )
                }
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                className="btn-star"
                data-testid="unstar-link"
                onClick={() => dispatch(unstarMovie(movie))}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!watchLater.watchLaterMovies
              .map((movie) => movie.id)
              .includes(movie.id) ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={() =>
                  dispatch(
                    addToWatchLater({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  )
                }
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={() => dispatch(removeFromWatchLater(movie))}
              >
                <i className="bi bi-check"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => viewTrailer(movie)}
            >
              View Trailer
            </button>
          </div>
          <img
            className="center-block"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "./images/not-found.jpg"
            }
            alt={`${movie.title} movie poster`}
          />
        </div>
        <h6 className="title">{movie.title}</h6>
      </div>
    </div>
  );
};

export default Movie;
