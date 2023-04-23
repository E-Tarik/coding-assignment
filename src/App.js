import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import { Header } from "./components/Header";
import { Movies } from "./components/Movies";
import { Starred } from "./components/Starred";
import { WatchLater } from "./components/WatchLater";
import { YouTubePlayerModal } from "./components/YoutubePlayer";
import { moviesSelector } from "./data/selector";

import "reactjs-popup/dist/index.css";
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const movies = useSelector(moviesSelector);
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const closeModal = () => setOpen(false);

  const getSearchResults = (query) => {
    if (query !== "") {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate("/");
    getSearchResults(query);
  };

  const getMovies = () => {
    if (searchQuery) {
      dispatch(
        fetchMovies(`${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}`)
      );
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id)
      // what
      .then(() => setOpen(true))
      .catch((error) => console.log(error));
  };

  const getMovie = async (id) => {
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

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="container">
        <YouTubePlayerModal isOpen={isOpen} videoKey={videoKey} />)
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                viewTrailer={viewTrailer}
                closeCard={closeModal}
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

export default App;
