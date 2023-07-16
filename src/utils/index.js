export const formMovieObject = (movie) => ({
  id: movie.id,
  overview: movie.overview,
  release_date: movie.release_date?.substring(0, 4),
  poster_path: movie.poster_path,
  title: movie.title,
})
