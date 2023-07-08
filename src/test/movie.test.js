import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils';
import App from '../App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { searchMoviesJSONMock, discoverMoviesJSONMock } from './movies.mocks';
import { ENDPOINT } from '../api/movies-api';

const server = setupServer(
  rest.get(`${ENDPOINT}/discover/movie`, (req, res, ctx) => {
    return res(ctx.json(discoverMoviesJSONMock));
  }),
  rest.get(`${ENDPOINT}/search/movie`, (req, res, ctx) => {
    return res(ctx.json(searchMoviesJSONMock));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('movies starred and saved to watch later', async () => {
  renderWithProviders(<App />);

  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump');
  await waitFor(() => {
    expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument();
  });
  const starMovieLink = screen.getAllByTestId('starred-link')[0];
  await waitFor(() => {
    expect(starMovieLink).toBeInTheDocument();
  });
  await userEvent.click(starMovieLink);
  await waitFor(() => {
    expect(screen.getByTestId('star-fill')).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByTestId('unstar-link')).toBeInTheDocument();
  });

  const watchLaterLink = screen.getAllByTestId('watch-later')[0];
  await waitFor(() => {
    expect(watchLaterLink).toBeInTheDocument();
  });
  await userEvent.click(watchLaterLink);
  await waitFor(() => {
    expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument();
  });

  await userEvent.click(screen.getAllByTestId('remove-watch-later')[0]);
});
