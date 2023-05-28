export const ROOT_URL = process.env.REACT_APP_API_URL;
export const API_KEY = process.env.REACT_APP_API_KEY;

export const ENDPOINT_DISCOVER =
	ROOT_URL + '/discover/movie/?api_key=' + API_KEY + '&sort_by=vote_count.desc';
export const ENDPOINT_SEARCH = ROOT_URL + '/search/movie?api_key=' + API_KEY;
