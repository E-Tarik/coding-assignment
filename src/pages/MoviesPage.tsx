import { useSelector } from 'react-redux';

// Components
import { Movie } from '../components';

// Types
import { IMovieItemModel } from '../types';

// Selectors
import { getAllMovies } from '../lib/redux/selectors';

type Props = {
	isLoading: boolean;
	lastMovieRef: (movie: HTMLDivElement) => void;
};

export const MoviesPage = ({ isLoading, lastMovieRef }: Props) => {
	const movies = useSelector(getAllMovies);
	const content = movies?.allMovies?.results?.map(
		(movie: IMovieItemModel, index: number) => {
			if (movies?.allMovies?.results?.length === index + 1) {
				return <Movie ref={lastMovieRef} key={movie.id} movie={movie} />;
			}
			return <Movie key={movie.id} movie={movie} />;
		},
	);

	return (
		<>
			<div className="movies-list" data-testid="movies">
				{content}
			</div>
			{isLoading && <p>Loading more categories...</p>}
		</>
	);
};
