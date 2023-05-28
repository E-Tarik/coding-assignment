import React, { useState, forwardRef, RefObject } from 'react';

// API
import { api } from '../api/api';

// Components
import { Modal, YouTubePlayer, Loader } from './index';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getStarredMovies, getWatchLaterMovies } from '../lib/redux/selectors';
import { watchLaterSlice, starredSlice } from '../lib/redux/slices';

// Models
import { IMovieItemModel } from '../types';

type Props = {
	movie: IMovieItemModel;
};

export const Movie = forwardRef(({ movie }: Props, ref) => {
	const starred = useSelector(getStarredMovies);
	const watchLater = useSelector(getWatchLaterMovies);
	const { starMovie, unstarMovie } = starredSlice.actions;
	const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

	const [isModalOpen, setModalOpen] = useState<boolean>(false);
	const [videoKey, setVideoKey] = useState(null);
	const [cardOpened, setCardOpened] = useState<boolean>(false);
	const [loadingTrailer, setLoadingTrailer] = useState<boolean>(false);

	const dispatch = useDispatch();

	const handleCloseCard = (e: React.MouseEvent) => {
		if (e.stopPropagation) e.stopPropagation();
		setCardOpened(false);
	};

	const handleOpenCard = () => {
		setCardOpened(true);
	};

	const openViewTrailerModal = async (movieId: string) => {
		setVideoKey(null);
		setModalOpen(true);
		setLoadingTrailer(true);

		try {
			const { data }: any = await api.movies.getMovieById(movieId);
			if (data.videos && data.videos.results.length) {
				currentMovieTrailer(data.videos.results);
			}
		} catch {
			console.log('Error loading trailer.');
		} finally {
			setLoadingTrailer(false);
		}
	};

	const currentMovieTrailer = (results: any[]) => {
		const trailer = results.find((vid) => vid.type === 'Trailer');
		setVideoKey(trailer ? trailer.key : results[0].key);
	};

	const handleHideModal = () => {
		setModalOpen(false);
	};

	const moviePosterSrc = (movie: IMovieItemModel) => {
		return movie.poster_path
			? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
			: 'not-found-500X750.jpeg';
	};

	const starButton = () => {
		const isMovieStarred = starred.starredMovies
			.map((movie: IMovieItemModel) => movie.id)
			.includes(movie.id);

		return !isMovieStarred ? (
			<span
				className="btn-star"
				data-testid="unstar-link"
				onClick={() => {
					dispatch(
						starMovie({
							id: movie.id,
							overview: movie.overview,
							release_date: movie.release_date?.substring(0, 4),
							poster_path: movie.poster_path,
							title: movie.title,
						}),
					);
				}}
			>
				<i className="bi bi-star" />
			</span>
		) : (
			<span
				className="btn-star"
				data-testid="starred-link"
				onClick={() => {
					dispatch(unstarMovie(movie));
				}}
			>
				<i className="bi bi-star-fill" data-testid="star-fill" />
			</span>
		);
	};

	const watchLaterButton = () => {
		const isMovieInList = watchLater.watchLaterMovies
			.map((movie: IMovieItemModel) => movie.id)
			.includes(movie.id);

		return !isMovieInList ? (
			<button
				type="button"
				data-testid="watch-later"
				className="btn btn-light btn-watch-later"
				onClick={() =>
					dispatch(
						addToWatchLater({
							id: movie.id,
							overview: movie.overview,
							release_date: movie.release_date?.substring(0, 4),
							poster_path: movie.poster_path,
							title: movie.title,
						}),
					)
				}
			>
				Watch Later
			</button>
		) : (
			<button
				type="button"
				data-testid="remove-watch-later"
				className="btn btn-light btn-watch-later blue"
				onClick={() => dispatch(removeFromWatchLater(movie))}
			>
				<i className="bi bi-check"></i>
			</button>
		);
	};

	return (
		<div
			className={`card ${cardOpened ? 'opened' : ''}`}
			ref={ref as RefObject<HTMLDivElement>}
			onClick={handleOpenCard}
		>
			<div className="card-body text-center">
				<div className="overlay" />
				<div className="info_panel">
					<div className="overview">{movie.overview}</div>
					<div className="year">{movie.release_date?.substring(0, 4)}</div>
					{starButton()}
					{watchLaterButton()}
					<button
						type="button"
						className="btn btn-dark"
						onClick={() => openViewTrailerModal(`${movie.id}`)}
					>
						View Trailer
					</button>
				</div>
				<img
					className="center-block"
					src={moviePosterSrc(movie)}
					alt="Movie poster"
				/>
			</div>
			<h6 className="title mobile-card">{movie.title}</h6>
			<h6 className="title">{movie.title}</h6>
			<button
				type="button"
				className="close"
				onClick={(e) => handleCloseCard(e)}
				aria-label="Close"
			>
				<span aria-hidden="true">&times;</span>
			</button>
			<Modal isOpen={isModalOpen} onClose={handleHideModal}>
				{loadingTrailer ? <Loader /> : <YouTubePlayer videoKey={videoKey} />}
			</Modal>
		</div>
	);
});
