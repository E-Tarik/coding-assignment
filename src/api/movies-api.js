import axios from 'axios';

export const API_KEY = process.env.REACT_APP_API_KEY;
export const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const http = axios.create({ baseURL: ENDPOINT, params: { api_key: API_KEY } });

const request = async (url, { params = {} } = {}) => {
  const response = await http(url, { params });

  return response.data;
};

const api = {
  discover: async ({ sortBy = 'vote_count.desc' } = {}) =>
    request('/discover/movie', { params: { sort_by: sortBy } }),
  search: async ({ query = '' } = {}) => request('/search/movie', { params: { query } }),
  movieDetails: ({ movieId, appendToResponse = 'videos' }) =>
    request(`/movie/${movieId}`, { params: { append_to_response: appendToResponse } }),
};

export { api };
