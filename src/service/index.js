import { ENDPOINT, API_KEY } from "../constants/api"


export const discoverUrl = `${ENDPOINT}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc&page=1`

export function getSearchUrl(query) {
  return `${ENDPOINT}/search/movie?api_key=${API_KEY}&query=${query}`
}