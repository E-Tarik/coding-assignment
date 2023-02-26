import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  BASE_URL,
  ENDPOINTS,
  API_KEY,
} from "../../core/constants/movie.constants";

import { Movie, SearchRes, Video } from "../../core/types/movie.type";

type Movies = {
  movies: Movie[];
  nextPage: number | undefined;
};

type WithLoadMore<T> = T & {
  nextPage?: number;
};

type SearchMovies = WithLoadMore<{
  searchTerm: string | null;
}>;

const transformMovieResponse = (res: SearchRes) => {
  const { results, page, total_pages } = res;
  const nextPage = page !== total_pages ? page + 1 : undefined;

  return { movies: results, nextPage };
};

const mergeMovies = (currentCache: Movies, newItems: Movies) => {
  const ids = new Set(currentCache.movies.map(({ id }) => id));
  currentCache.movies = [
    ...currentCache.movies,
    ...newItems.movies.filter(({ id }) => !ids.has(id)),
  ];
  currentCache.nextPage = newItems.nextPage;
};

export const movieApi = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovieVideoById: builder.query<string, number>({
      query: (id) =>
        `/movie/${id}?api_key=${API_KEY}&append_to_response=videos`,
      transformResponse: (res: Video) => {
        const videos = res.videos.results;
        const trailer = videos.find((video) => video.type === "Trailer")?.key;

        if (trailer) return trailer;

        return videos[0].key;
      },
    }),
    getMoviesBySearchTerm: builder.query<Movies, SearchMovies>({
      query: ({ searchTerm, nextPage }) => {
        let query = ENDPOINTS.SEARCH;
        if (searchTerm) query += `&query=${encodeURIComponent(searchTerm)}`;
        if (nextPage) query += `&page=${nextPage}`;

        return query;
      },
      transformResponse: transformMovieResponse,
      merge: mergeMovies,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    getMovies: builder.query<Movies, { nextPage?: number }>({
      query: ({ nextPage }) => {
        let query = ENDPOINTS.DISCOVER;
        if (nextPage) query += `&page=${nextPage}`;

        return query;
      },
      transformResponse: transformMovieResponse,
      merge: mergeMovies,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMoviesBySearchTermQuery,
  useGetMovieVideoByIdQuery,
} = movieApi;
