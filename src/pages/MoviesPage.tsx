// Components
import { Movie } from '../components';

// Types
import { IMovieItemModel } from '../types';

type Props = {
	movies: IMovieItemModel[];
	isLoading: boolean;
	lastMovieRef: (movie: HTMLDivElement) => void;
};

export const MoviesPage = ({ movies, isLoading, lastMovieRef }: Props) => {
	const content = movies?.map((movie: IMovieItemModel, index: number) => {
		if (movies?.length === index + 1) {
			return <Movie ref={lastMovieRef} key={movie.id} movie={movie} />;
		}
		return <Movie key={movie.id} movie={movie} />;
	});

	return (
		<>
			<div className="movies-list" data-testid="movies">
				{content}
			</div>
			{isLoading && <p>Loading more categories...</p>}
		</>
	);
};
