export const moviesMock = [
  {
    id: '27205',
    overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating...',
    poster_path: '/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
    release_date: '2010-07-15',
    title: 'Inception',
  },
  {
    id: '157336',
    overview: 'The adventures of a group of explorers who make use of...',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    release_date: '2014-11-05',
    title: 'Interstellar',
  },
];

export const discoverMoviesJSONMock = {
  page: 1,
  results: moviesMock,
  total_pages: 1,
  total_results: 2,
};

export const searchMoviesJSONMock = {
  page: 1,
  results: [
    {
      id: 13,
      overview:
        'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.',
      poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      release_date: '1994-06-23',
      title: 'Forrest Gump',
    },
    {
      id: 237353,
      overview:
        "A look behind the scenes of Robert Zemeckis' 1994 Oscar-winning film, 'Forrest Gump'.",
      poster_path: '/dfjLE1HjdR9XhEpN04elCGUOJfA.jpg',
      release_date: '1994-10-01',
      title: 'Through the Eyes of Forrest Gump',
    },
  ],
  total_pages: 1,
  total_results: 2,
};

export const movieDetailsJSONMock = {
  videos: {
    results: [
      {
        type: 'Trailer',
        key: '1',
      },
    ],
  },
};
