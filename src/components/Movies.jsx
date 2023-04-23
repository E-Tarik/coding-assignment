import Movie from './Movie'

import '../styles/movies.scss'

export const Movies = ({movies, viewTrailer}) => (
    <div data-testid="movies" className="movies">
        {movies.results?.map((movie) => {
            return (
                <Movie
                    key={movie.id}
                    movie={movie}
                    viewTrailer={viewTrailer}
                />
            )
        })}
    </div>
);
