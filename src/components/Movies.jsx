import Movie from "./Movie";

import "../styles/movies.scss";
import { forwardRef } from "react";

export const Movies = forwardRef(
  ({ movies, viewTrailer, isLoading }, lastRef) => (
    <div data-testid="movies" className="movies">
      {movies?.map((movie, index) => {
        if (index + 1 === movies.length) {
          console.log("ref must be", movie.title);
          return (
            <Movie
              key={movie.id}
              ref={lastRef}
              movie={movie}
              viewTrailer={viewTrailer}
            />
          );
        } else {
          return (
            <Movie key={movie.id} movie={movie} viewTrailer={viewTrailer} />
          );
        }
      })}
      {isLoading && <div className="spinner-border" role="status" />}
    </div>
  )
);

Movies.displayName = "Movies";
