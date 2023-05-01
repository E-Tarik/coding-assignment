import { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";

import { Header } from "./components/Header";
import { Starred } from "./components/Starred";
import { WatchLater } from "./components/WatchLater";
import { YouTubePlayerModal } from "./components/YoutubePlayer";
import { Movie } from "./components/Movie";

import { useSearch } from "./utils/hooks";
import { loadTrailer } from "./utils/utils";

import "reactjs-popup/dist/index.css";
import "./app.scss";

export const App = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(searchQuery || "");
  const [videoKey, setVideoKey] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const { movies, isLoading, hasError, loadMore } = useSearch(query, page);
  const observer = useRef();

  useEffect(() => {
    return () => {
      setVideoKey(null);
      setOpen(false);
    };
  }, [setVideoKey, setOpen]);

  const lastMovieElementRef = useCallback(
    (node) => {
      console.log("node=", node);

      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loadMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore]
  );

  const closeModal = () => {
    setVideoKey(null);
    setOpen(false);
  };

  const searchMovies = (query) => {
    navigate("/");
    setQuery(query);
    setPage(1);
  };

  const viewTrailer = (movie) => {
    loadTrailer(setVideoKey, movie.id)
      .then(() => setOpen(true))
      .catch((error) => console.log(error));
  };

  const resetSearch = () => {
    setQuery(null);
    setQuery(query);
  };

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="container">
        <YouTubePlayerModal
          isOpen={isOpen}
          videoKey={videoKey}
          onCloseModal={closeModal}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div data-testid="movies" className="movies">
                  {movies?.map((movie, index) => {
                    if (index + 1 === movies.length) {
                      return (
                        <Movie
                          key={movie.id}
                          ref={lastMovieElementRef}
                          movie={movie}
                          viewTrailer={viewTrailer}
                        />
                      );
                    } else {
                      return (
                        <Movie
                          key={movie.id}
                          movie={movie}
                          viewTrailer={viewTrailer}
                        />
                      );
                    }
                  })}
                  {isLoading && (
                    <div className="spinner-border" role="status" />
                  )}
                  {!loadMore && !isLoading && (
                    <div className="divider">End of list</div>
                  )}
                  {!isLoading && hasError && (
                    <button
                      className="reload"
                      hint="Loading error"
                      onClick={() => resetSearch()}
                    >
                      Try again
                    </button>
                  )}
                </div>
              </>
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};
