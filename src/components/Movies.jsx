import "../styles/movies.scss";
import { forwardRef, useRef } from "react";
import Movie from "./Movie";

export const Movies = forwardRef(({ movies, viewTrailer }, ref) => {
  console.log("last ref", ref);
  return (
    <div data-testid="movies" className="movies">
      {movies?.map((movie, index) => {
        if (index + 1 === movies.length) {
          // console.log("ref must be", movie.title);
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
