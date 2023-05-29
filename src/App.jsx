import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';

// Components
import { Header } from './components';

// Pages
import { MoviesPage, StarredPage, WatchLaterPage } from './pages';

// Hooks
import { useMovies } from './hooks';

// Redux
import { moviesSlice } from './lib/redux/slices';

const App = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get('search');
	const [pageNum, setPageNum] = useState(1);
	const [query, setQuery] = useState(searchQuery || '');

	const { isLoading, hasNextPage } = useMovies(query, pageNum);

	const observer = useRef();
	const dispatch = useDispatch();
	const { clearAllMovies } = moviesSlice.actions;
	const navigate = useNavigate();

	const lastMovieElementRef = useCallback(
		(elem) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					setPageNum((prevPage) => prevPage + 1);
				}
			});
			if (elem) observer.current.observe(elem);
		},
		[isLoading, hasNextPage, setPageNum],
	);

	const searchMovies = (query) => {
		navigate('/');
		setPageNum(1);
		setQuery(query);
		dispatch(clearAllMovies());
		scrollToFirstPage();
	};

	const scrollToFirstPage = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
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
