import {useCallback} from 'react'
import {createSearchParams, useSearchParams, useNavigate } from "react-router-dom"

export function Search () {

  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()


  const search =  useCallback((event) => {
    setSearchParams(createSearchParams({ search: event.target.value }))
  }, [setSearchParams])

  const handleFocus = useCallback(() => {
    navigate('/')
  }, [navigate])

  return <div className="input-group rounded">
    <input type="search" data-testid="search-movies"
      onKeyUp={search}
      onFocus={handleFocus}
      className="form-control rounded" 
      placeholder="Search movies..." 
      aria-label="Search movies" 
      aria-describedby="search-addon" 
      />
</div>  
}