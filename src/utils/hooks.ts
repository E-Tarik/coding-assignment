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
      axios.get(`${ENDPOINT_SEARCH}&query=${query}`);
      setSearchParams(createSearchParams({ search: query }));
    } else {
      axios.get(ENDPOINT_DISCOVER);
      setSearchParams();
    }
  }, [query, page]);
};
