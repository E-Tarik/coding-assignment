import { useEffect, useState } from "react";
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "../constants";
import { fetchMovies } from "../data/moviesSlice";
import { useDispatch } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";

export const useSearch = (query: string, page = 1) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    if (query !== "") {
      //@ts-ignore
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      //@ts-ignore
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  }, [query, page]);
};
