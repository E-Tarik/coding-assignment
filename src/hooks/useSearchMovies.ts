import type { RefObject } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  movieApi,
  useGetMoviesBySearchTermQuery,
} from "../store/api/movies.api";
import { useAppDispatch } from "../store/hooks";
import useInfiniteScroll from "./useInfiniteScroll";

type UseSearchMoviesProps = {
  ref: RefObject<HTMLDivElement | null>;
};

const useSearchMovies = ({ ref }: UseSearchMoviesProps) => {
  const [nextPage, setNextPage] = useState<number | undefined>(undefined);
  const [params, setParams] = useSearchParams();
  const searchTerm = params.get("query") ?? "";

  useInfiniteScroll({
    ref,
    loadMoreFn: () => setNextPage(data?.nextPage),
  });

  const { data, isLoading } = useGetMoviesBySearchTermQuery({
    searchTerm,
    nextPage,
  });

  const dispatch = useAppDispatch();

  const handleSearchTermChange = (searchTerm: string) => {
    setParams({ query: searchTerm });
    dispatch(movieApi.util.resetApiState());
  };

  const handleHomeClick = () => {
    setNextPage(undefined);
    dispatch(
      movieApi.util.prefetch(
        "getMovies",
        { nextPage: undefined },
        { force: true }
      )
    );
  };

  return {
    searchedMovies: data?.movies,
    searchedMoviesLoading: isLoading,
    searchTerm,
    handleSearchTermChange,
    handleHomeClick,
    shouldShowSearchedMovies: !!params.get("query"),
  };
};

export default useSearchMovies;
