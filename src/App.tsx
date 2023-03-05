import { FC, useRef, useState } from "react";
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import { Movie as TMovie } from "./core/types/movie.type";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useGetMoviesQuery } from "./store/api/movies.api";
import { clearAllStarred } from "./store/slice/starred.slice";
import { removeAllWatchLater } from "./store/slice/watchLater.slice";

import useSearchMovies from "./hooks/useSearchMovies";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import useModal from "./hooks/useModal";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import Title from "./components/Title";
import Movies from "./components/Movies";
import ClearButton from "./components/ClearButton";
import YouTubePlayer from "./components/YouTubePlayer";

import "reactjs-popup/dist/index.css";

const App: FC = () => {
  const { starred, watchLater } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const { renderModal } = useModal();

  const allMoviesLoadMoreRef = useRef<HTMLDivElement | null>(null);
  const searchMoviesLoadMoreRef = useRef<HTMLDivElement | null>(null);

  const [nextPage, setNextPage] = useState<number | undefined>(undefined);
  const { data: allMovies, isLoading: allMoviesLoading } = useGetMoviesQuery({
    nextPage,
  });
  useInfiniteScroll({
    ref: allMoviesLoadMoreRef,
    loadMoreFn: () => setNextPage(allMovies?.nextPage),
  });

  const {
    searchedMovies,
    searchedMoviesLoading,
    searchTerm,
    handleSearchTermChange,
    handleHomeClick,
    shouldShowSearchedMovies,
  } = useSearchMovies({ ref: searchMoviesLoadMoreRef });

  const handleClearWatchLater = () => dispatch(removeAllWatchLater());
  const handleClearStarred = () => dispatch(clearAllStarred());
  const handleViewTrailer = (movie: TMovie) =>
    renderModal(<YouTubePlayer movieId={movie.id} />);

  return (
    <div className="App">
      <Header
        searchTerm={searchTerm}
        searchMovies={handleSearchTermChange}
        handleHomeClick={handleHomeClick}
      />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                {shouldShowSearchedMovies ? (
                  <Fragment>
                    <Movies
                      dataTestId="search-movies"
                      movies={searchedMovies}
                      viewTrailer={handleViewTrailer}
                    />
                    <div ref={searchMoviesLoadMoreRef}>
                      {searchedMoviesLoading && <RotatingLines />}
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Movies
                      dataTestId="movies"
                      movies={allMovies?.movies}
                      viewTrailer={handleViewTrailer}
                    />

                    <div ref={allMoviesLoadMoreRef}>
                      {allMoviesLoading && <RotatingLines />}
                    </div>
                  </Fragment>
                )}
              </Fragment>
            }
          />
          <Route
            path="/starred"
            element={
              <Movies
                title={<Title text="Starred Movies" />}
                dataTestId="starred"
                movies={starred?.starredMovies}
                viewTrailer={handleViewTrailer}
                noMoviesMessage={
                  <Fragment>
                    <i className="bi bi-star" />
                    <p>There are no starred movies.</p>
                  </Fragment>
                }
              >
                <ClearButton
                  text="Remove all starred"
                  handleClick={handleClearStarred}
                />
              </Movies>
            }
          />
          <Route
            path="/watch-later"
            element={
              <Movies
                title={<Title text="Watch Later" />}
                dataTestId="watch-later"
                movies={watchLater?.watchLaterMovies}
                viewTrailer={handleViewTrailer}
                noMoviesMessage={
                  <Fragment>
                    <i className="bi bi-heart" />
                    <p>You have no movies saved to watch later.</p>
                  </Fragment>
                }
              >
                <ClearButton
                  text="Remove all watch later"
                  handleClick={handleClearWatchLater}
                />
              </Movies>
            }
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
