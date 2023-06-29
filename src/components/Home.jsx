import React, { useRef, useEffect } from 'react'
import Movies from './Movies'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies } from '../data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants'
import '../styles/starred.scss'

function Home () {
  const movies = useSelector((state) => state.movies)
  const { list: moviesList, query, pagination: { page, totalPages }, fetchStatus } = movies
  const moreRef = useRef()
  const dispatch = useDispatch()

  const observeMovies = (entries) => {
    if (entries[0].intersectionRatio <= 0) return
    getMovies(page + 1)
  }

  const getMovies = (page) => {
    if (query) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&page=${page}&query=` + query))
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${page}`))
    }
  }

  const options = {
    root: null
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(observeMovies, options)

    if (moreRef.current) {
      observer.observe(moreRef.current)
    }

    return () => {
      if (moreRef.current) {
        observer.unobserve(moreRef.current)
      }
    }
  }, [moreRef, options])

  return (
    <>
      <Movies
        movies={moviesList}
      />

      {fetchStatus !== 'loading' && totalPages > page
        ? (
          <div
            className="more"
            ref={moreRef}
          >
            <p className="virtual" />
            loading ...
          </div>
        )
        : null}
    </>
  )
}

export default Home
