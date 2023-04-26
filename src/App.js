import { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";

import { ENDPOINT, API_KEY } from "./constants";
import { Header } from "./components/Header";
import { Movies } from "./components/Movies";
import { Starred } from "./components/Starred";
import { WatchLater } from "./components/WatchLater";
import { YouTubePlayerModal } from "./components/YoutubePlayer";

import "reactjs-popup/dist/index.css";
import "./app.scss";
import { useSearch } from "./utils/hooks";

export const App = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(searchQuery || "");
  const [videoKey, setVideoKey] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const { movies, isLoading, error, loadMore } = useSearch(query, page);
  const observer = useRef();
  console.log("query", query, "isLoading", isLoading);

  useEffect(() => {
    return () => {
      setVideoKey(null);
      setOpen(false);
    };
  }, [setVideoKey, setOpen]);

  const lastMovieElementRef = useCallback(
    (node) => {
      console.log("node", node);
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log("entries", entries);
        if (entries[0].isIntersecting && loadMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [movies]
  );
  const closeModal = () => {
    setVideoKey(null);
    setOpen(false);
  };

  const searchMovies = (query) => {
    navigate("/");
    setQuery(query);
    setPage(1);
    // setSearchParams({ query });
  };

  const viewTrailer = (movie) => {
    console.log("open modal for", movie.title, movie);
    loadTrailer(movie.id)
      // what
      .then(() => setOpen(true))
      .catch((error) => console.log(error));
  };

  const loadTrailer = async (id) => {
    // todo move to separate file
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    await fetch(URL)
      .then((response) => response.json())
      .then((videoData) => {
        const { videos } = videoData;
        if (videos?.results.length) {
          const trailer = videos.results.find((vid) => vid.type === "Trailer");
          setVideoKey(trailer ? trailer.key : videos.results[0].key);
        }
      })
      .catch((error) =>
        // todo show error message in UI
        console.log(error)
      );
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
              <Movies
                movies={movies}
                viewTrailer={viewTrailer}
                closeCard={closeModal}
                isLoading={isLoading}
                lastRef={movies.length && lastMovieElementRef}
              />
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
