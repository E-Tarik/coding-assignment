import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils';
import App from '../../App';

it('Watch Later movies page', async () => {
  renderWithProviders(<App />);

  // Simulate typing 'forrest gump' in the search input
  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump');

  // Wait for the movie search results to appear
  await waitFor(() => {
    expect(
      screen.getAllByText('Through the Eyes of Forrest Gump')[0]
    ).toBeInTheDocument();
  });

  // Get the watch later button for the first movie in the search results
  const watchLaterButton = await screen.findAllByTestId('watch-later');

  // Click the watch later button
  await userEvent.click(watchLaterButton[0]);

  // Button should now be replaced with the remove button
  await waitFor(
    async () => {
      const removeButton = await screen.findByTestId('remove-watch-later');
      expect(removeButton).toBeInTheDocument();
    }
  );

  // Visit watch later page
  await userEvent.click(screen.getByText(/watch later/));

  await waitFor(() => {
    expect(screen.getAllByText('Forrest Gump')[0]).toBeInTheDocument();
  });

  // Click Empty List
  userEvent.click(screen.getByText('Empty list'));

  // Nothing should be There
  await waitFor(() => {
    expect(
      screen.getByText(/You have no movies saved to watch later/i)
    ).toBeInTheDocument();
  });
});
