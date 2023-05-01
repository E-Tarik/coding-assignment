import { forwardRef } from "react";
import { Movie } from "./Movie";

import "../styles/movies.scss";

export const Movies = forwardRef(({ movies, viewTrailer }, ref) => {
  return (
    <div data-testid="movies" className="movies">
      {movies?.map((movie, index) => {
        if (index + 1 === movies.length) {
          return (
            <Movie
              key={movie.id}
              ref={ref}
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
    </div>
  );
});

Movies.displayName = "Movies";
