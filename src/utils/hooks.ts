import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "../constants";

export const useSearch = (query: string, page = 1) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (query !== "") {
      axios.get(`${ENDPOINT_SEARCH}&query=${query}`).then((res) => {
        console.log("res 1", query, res.data.results);

        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      });
      setSearchParams(createSearchParams({ search: query }));
    } else {
      axios.get(ENDPOINT_DISCOVER).then((res) => {
        console.log("res 2", res);
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      });
      setSearchParams();
    }
  }, [query, page]);
  return [movies];
};
