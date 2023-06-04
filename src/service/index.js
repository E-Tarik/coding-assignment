import { ENDPOINT, API_KEY } from "../constants/api"


export function getDiscoverURl (page = 1) {
  return `${ENDPOINT}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc&page=${page}`
}

export function getSearchUrl(query) {
  return `${ENDPOINT}/search/movie?api_key=${API_KEY}&query=${query}`
}

export function getMovieUrl(id) {
  return `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
}