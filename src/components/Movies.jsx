import "../styles/movies.scss";
import { forwardRef, useRef } from "react";

export const Movies = forwardRef(
  ({ movies, viewTrailer, isLoading }, lastRef) => {
    const fallbackRef = useRef(null);
    return <div className="movies"></div>;
  }
);

Movies.displayName = "Movies";
