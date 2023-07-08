import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test/utils';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { searchMoviesJSONMock, discoverMoviesJSONMock, movieDetailsJSONMock } from './test/movies.mocks';
import { ENDPOINT } from './api/movies-api';

jest.mock('react-player/lazy', () => {
  return jest.requireActual('react-player');
});

const server = setupServer(
  rest.get(`${ENDPOINT}/discover/movie`, (req, res, ctx) => {
    return res(ctx.json(discoverMoviesJSONMock));
  }),
  rest.get(`${ENDPOINT}/search/movie`, (req, res, ctx) => {
    return res(ctx.json(searchMoviesJSONMock));
  }),
  rest.get(`${ENDPOINT}/movie/:movieId`, (req, res, ctx) => {
    return res(ctx.json(movieDetailsJSONMock));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('renders watch later link', () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/watch later/i);
  expect(linkElement).toBeInTheDocument();
});

it('search for movies', async () => {
  renderWithProviders(<App />);
  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump');
  await waitFor(() => {
    expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument();
  });
  const viewTrailerBtn = screen.getAllByText('View Trailer')[0];
  await userEvent.click(viewTrailerBtn);
  await waitFor(() => {
    expect(screen.getByTestId('youtube-player')).toBeInTheDocument();
  });
});

it('renders watch later component', async () => {
  renderWithProviders(<App />);
  const user = userEvent.setup();
  await user.click(screen.getByText(/watch later/i));
  expect(screen.getByText(/You have no movies saved to watch later/i)).toBeInTheDocument();
});

it('renders starred component', async () => {
  renderWithProviders(<App />);
  const user = userEvent.setup();
  await user.click(screen.getByTestId('nav-starred'));
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument();
  });
});
