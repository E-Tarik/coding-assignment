import Movie from '../components/Movie'
import '../styles/movies.scss'
import { useMovies } from '../hooks/useMovies'

const Movies = ({ viewTrailer, closeCard }) => {

    const {movies} = useMovies()

    return (
        <div data-testid="movies" className="movies">
            {movies.movies.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })}
        </div>
    )
}

export default Movies
