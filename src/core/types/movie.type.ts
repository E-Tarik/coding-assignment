export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
};

export type Video = Movie & {
  videos: {
    results: {
      name: string;
      id: string;
      key: string;
      type: "Trailer" | "Teaser" | "Featurette";
    }[];
  };
};

export type SearchRes = {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
};
