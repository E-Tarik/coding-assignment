import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSearchParams, useSearchParams } from 'react-router-dom';

// API
import { api } from '../api/api';
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../api/config';

// Redux
import { moviesSlice } from '../lib/redux/slices';
const { setAllMovies, clearAllMovies } = moviesSlice.actions;

export const useMovies = (query: string, page = 1) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [hasNextPage, setNextPage] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		dispatch(clearAllMovies());
	}, [searchParams, query]);

	const getMoviesAndUpdateLocalData = async (url: string) => {
		try {
			const { data } = await api.movies.fetchMovies(url);
			dispatch(setAllMovies(data));
			setNextPage(data.page < data.total_pages);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const url = query?.length
			? `${ENDPOINT_SEARCH}&query=${query}&page=${page}`
			: `${ENDPOINT_DISCOVER}&page=${page}`;

		setIsLoading(true);
		getMoviesAndUpdateLocalData(url);
		setSearchParams(
			query?.length ? createSearchParams({ search: query }) : undefined,
		);
	}, [query, page]);
	return { isLoading, hasNextPage };
};
