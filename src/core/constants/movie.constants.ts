export const API_KEY = "8cac6dec66e09ab439c081b251304443";

export const BASE_URL = "https://api.themoviedb.org/3";

export const ENDPOINTS = {
  DISCOVER: `/discover/movie/?api_key=${API_KEY}&sort_by=vote_count.desc`,
  SEARCH: `/search/movie?api_key=${API_KEY}`,
  MOVIE: `/movie/507086?api_key=${API_KEY}&append_to_response=videos`,
};

