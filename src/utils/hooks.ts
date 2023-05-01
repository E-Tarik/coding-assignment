import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "../constants";

export const useSearch = (query: string, page = 1) => {
  // console.log("usesearch", query, page);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const isQueryNonEmpty = query?.length > 0;

  useEffect(() => {
    setMovies([]);
  }, [searchParams, query]);
  useEffect(() => {
    let cancelRequest: any;

    setLoading(true);
    setHasError(false);
    axios({
      method: "GET",
      url: isQueryNonEmpty
        ? `${ENDPOINT_SEARCH}&query=${query}&page=${page}`
        : `${ENDPOINT_DISCOVER}&page=${page}`,
      cancelToken: new axios.CancelToken((c) => {
        cancelRequest = c;
      }),
      timeout: 5000,
    })
      .then((res) => {
        // @ts-ignore
        setMovies((prevState) => [...prevState, ...res.data.results]);
        const totalPagesRes = res.data.total_pages;
        setLoadMore(res.data.page < totalPagesRes);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        } else {
          setLoading(false);
          setHasError(true);
        }
      });
    setSearchParams(
      isQueryNonEmpty ? createSearchParams({ search: query }) : undefined
    );

    return () => cancelRequest();
  }, [query, page]);
  return { movies, isLoading, loadMore, hasError };
};
