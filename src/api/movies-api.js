export const API_KEY = process.env.REACT_APP_API_KEY;
export const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const http = async url => {
  const response = await fetch(`${ENDPOINT}${url}`);

  return response.json();
};

const api = {
  discover: ({ sortBy = 'vote_count.desc' } = {}) =>
    http(`/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}`),
  search: ({ query = '' } = {}) => http(`/search/movie?api_key=${API_KEY}&query=${query}`),
  movieDetails: ({ movieId, appendToResponse = 'videos' }) =>
    http(`/movie/${movieId}?api_key=${API_KEY}&{append_to_response=${appendToResponse}`),
};

export { api };
