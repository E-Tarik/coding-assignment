import Movie from '../components/Movie';
import '../styles/movies.scss';
import { useMovies } from '../hooks/useMovies';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { LoadingSpinner } from '../components/global/Spinner';

const Movies = () => {
  const { page } = useInfiniteScroll('movies-load-more');
  const { movies, isSearchMode } = useMovies(page);

  return (
    <div data-testid="movies" className="movies">
      {movies.movies.results?.map((movie) => {
        return <Movie movie={movie} key={movie.id} />;
      })}
      {!isSearchMode ? (
        <div id="movies-load-more">
          <LoadingSpinner />
        </div>
      ) : null}
    </div>
  );
};

export default Movies;
