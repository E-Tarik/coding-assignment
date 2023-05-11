import { useState, useEffect } from 'react';

import { MovieItemModel, ResponseModel } from 'models';
import { useAppDispatch } from 'hooks';
import { getAllMovies, searchMovies } from 'services';

export const useMovies = (pageNum = 1, searchValue = '') => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    if (!!searchValue) {
      dispatch(searchMovies(searchValue, pageNum))
        .then((result) => {
          setHasNextPage(
            Boolean((result as ResponseModel<MovieItemModel[]>)?.results.length)
          );
        })
        .finally(() => setIsLoading(false));
    } else {
      dispatch(getAllMovies(pageNum))
        .then((result) => {
          setHasNextPage(Boolean((result as any)?.results.length));
        })
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, pageNum, searchValue]);

  return { isLoading, hasNextPage };
};
