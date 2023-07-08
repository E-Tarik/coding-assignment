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

it('Watch Later movies page', async () => {
  renderWithProviders(<App />);

  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump');
  await waitFor(() => {
    expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument();
  });
  const watchLaterLink = screen.getAllByTestId('watch-later')[0];
  await waitFor(() => {
    expect(watchLaterLink).toBeInTheDocument();
  });
  await userEvent.click(watchLaterLink);

  const watchLaterNavLink = screen.getAllByTestId('nav-watch-later')[0];
  await userEvent.click(watchLaterNavLink);

  await waitFor(() => {
    expect(screen.getAllByText('Forrest Gump')[0]).toBeInTheDocument();
  });
});
