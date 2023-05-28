import { useEffect, useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';

// API
import { api } from '../api/api';
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../api/config';

// Models
import { IMovieItemModel } from '../types';

export const useMovies = (query: string, page = 1) => {
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState<IMovieItemModel[]>([]);
	const [hasNextPage, setNextPage] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setMovies([]);
	}, [searchParams, query]);

	const getMoviesAndUpdateLocalData = async (url: string) => {
		try {
			const { data } = await api.movies.fetchMovies(url);
			setMovies([...movies, ...data.results]);
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
	return { movies, isLoading, hasNextPage };
};
