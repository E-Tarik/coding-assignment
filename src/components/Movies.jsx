import '../styles/movies.scss'

import { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { useMovies } from '../hooks'
import Movie from './Movie'

const Movies = ({ movies, viewTrailer, closeCard }) => {
  const { loadMovies } = useMovies()
  const [searchParams] = useSearchParams()
  const searchValue = searchParams.get('search')
  const lastMovieRef = useRef(null)
  const {
    movies: { page, hasMore },
  } = useSelector((state) => state)

  useEffect(() => {
    loadMovies(1, searchValue)
  }, [searchValue])

  const observer = useCallback(
    (node) => {
      if (!node) {
        return
      }
      if (lastMovieRef.current) {
        lastMovieRef.current.disconnect()
      }
      lastMovieRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMovies(page + 1, searchValue)
        }
      })
      lastMovieRef.current.observe(node)
    },
    [hasMore, page, searchValue]
  )
  return (
    <div data-testid="movies" className="movies-grid">
      {movies.movies.map((movie, index) => {
        return (
          <Movie
            movie={movie}
            ref={index === movies.movies.length - 1 ? observer : undefined}
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
