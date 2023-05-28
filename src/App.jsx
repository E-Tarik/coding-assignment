import { useState, useRef, useCallback } from 'react';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';

// Components
import { Header } from './components';

// Pages
import { MoviesPage, StarredPage, WatchLaterPage } from './pages';

// Hooks
import { useMovies } from './hooks';

const App = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get('search');
	const [pageNum, setPageNum] = useState(1);
	const [query, setQuery] = useState(searchQuery || '');
	const { movies, isLoading, hasNextPage } = useMovies(query, pageNum);
	const observer = useRef();

	const navigate = useNavigate();

	const lastMovieElementRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					setPageNum((prevPage) => prevPage + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasNextPage],
	);

	const searchMovies = (query) => {
		navigate('/');
		setQuery(query);
		setPageNum(1);
	};

	return (
		<div className="App">
			<div id="modal-container"></div>

			<Header
				searchMovies={searchMovies}
				searchParams={searchParams}
				setSearchParams={setSearchParams}
			/>

			<div className="container">
				<Routes>
					<Route
						path="/"
						element={
							<MoviesPage
								movies={movies}
								isLoading={isLoading}
								lastMovieRef={lastMovieElementRef}
							/>
						}
					/>
					<Route path="/starred" element={<StarredPage />} />
					<Route path="/watch-later" element={<WatchLaterPage />} />
					<Route
						path="*"
						element={<h1 className="not-found">Page Not Found</h1>}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
