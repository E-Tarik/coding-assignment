import { Fragment } from "react";
import type { FC, ReactNode, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { Movie as TMovie } from "../../core/types/movie.type";

import Movie from "../Movie";

import "./Movies.scss";

type MoviesProps = PropsWithChildren<{
  title?: ReactNode;
  dataTestId: string;
  movies?: TMovie[];
  noMoviesMessage?: ReactNode;
  viewTrailer: (movie: TMovie) => void;
}>;

const Movies: FC<MoviesProps> = ({
  title,
  dataTestId,
  viewTrailer,
  noMoviesMessage,
  movies,
  children,
}) => (
  <div className="movies" data-testid={dataTestId}>
    {title}
    {movies && movies.length > 0 && (
      <Fragment>
        <div className="container">
          {movies?.map((movie) => (
            <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
          ))}
        </div>
        {children}
      </Fragment>
    )}

    {noMoviesMessage && movies?.length === 0 && (
      <div className="text-center empty-cart">
        {noMoviesMessage}
        <p>
          Go <Link to="/">Home</Link>
        </p>
      </div>
    )}
  </div>
);

export default Movies;
