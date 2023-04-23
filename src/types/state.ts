export interface AppState {
    movies: { movies: [],
            fetchStatus: 'success' | 'loading' | 'error',
        },
    watchLater: { watchLaterMovies: [] }
    starred: {starredMovies: []},
}

export type Video = {
    key: string;
    name: string;
    type: string;
};

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
    videos?: {};
}

export interface Videos {
    videos?: {
        results?: Video[],
    }
}
