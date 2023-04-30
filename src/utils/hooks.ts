import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "../constants";

export const useSearch = (query: string, page = 1) => {
  console.log("useSearch", query, page);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const isQueryNonEmpty = query?.length > 0;

  useEffect(() => {
    setMovies([]);
  }, [searchParams, query]);
  useEffect(() => {
    let cancelRequest: any;

    setLoading(true);
    setError(null);
    axios({
      method: "GET",
      url: isQueryNonEmpty
        ? `${ENDPOINT_SEARCH}&query=${query}&page=${page}`
        : `${ENDPOINT_DISCOVER}&page=${page}`,
      cancelToken: new axios.CancelToken((c) => {
        cancelRequest = c;
      }),
    })
      .then((res) => {
        // @ts-ignore
        setMovies((prevState) => [...prevState, ...res.data.results]);
        setTotalPages(res.data.total_pages);
        setLoadMore(res.data.page < totalPages);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        } else {
          setError(e);
        }
      });
    setSearchParams(
      isQueryNonEmpty ? createSearchParams({ search: query }) : undefined
    );

    return () => cancelRequest();
  }, [query, page]);
  return { movies, isLoading, loadMore, error };
};
