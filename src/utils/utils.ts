import {Movie} from "../types/state";

export const getMovieMetadata = (movie: Movie) => {
    const { id, title, poster_path, release_date, vote_average, overview } = movie;
    return {
        id,
        title,
        poster_path,
        release_date: release_date?.substring(0, 4),
        vote_average,
        overview,
    };
}
