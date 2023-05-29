import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getStarredMovies } from '../lib/redux/selectors';

export const Header = ({ searchMovies }) => {
	const starred = useSelector(getStarredMovies);

	return (
		<header>
			<Link to="/" data-testid="home" onClick={() => searchMovies('')}>
				<i className="bi bi-film" />
			</Link>

			<nav>
				<NavLink
					to="/starred"
					data-testid="nav-starred"
					className="nav-starred"
				>
					{starred.starredMovies.length > 0 ? (
						<>
							<i className="bi bi-star-fill bi-star-fill-white" />
							<sup className="star-number">{starred.starredMovies.length}</sup>
						</>
					) : (
						<i className="bi bi-star" />
					)}
				</NavLink>
				<NavLink to="/watch-later" className="nav-fav">
					watch later
				</NavLink>
			</nav>

			<div className="input-group rounded">
				<input
					type="search"
					data-testid="search-movies"
					onChange={(e) => searchMovies(e.target.value)}
					className="form-control rounded"
					placeholder="Search movies..."
					aria-label="Search movies"
					aria-describedby="search-addon"
				/>
			</div>
		</header>
	);
};
