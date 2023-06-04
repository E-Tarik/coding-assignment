import Movie from '../components/Movie'
import '../styles/movies.scss'
import { useMovies } from '../hooks/useMovies'

const Movies = () => {

    const {movies} = useMovies()

    return (
        <div data-testid="movies" className="movies">
            {movies.movies.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                    />
                )
            })}
        </div>
    )
}

export default Movies
