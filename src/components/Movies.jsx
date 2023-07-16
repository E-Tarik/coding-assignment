import '../styles/movies.scss'

import Movie from './Movie'

const Movies = ({ movies, viewTrailer, closeCard }) => {
  return (
    <div data-testid="movies" className="movies-grid">
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
