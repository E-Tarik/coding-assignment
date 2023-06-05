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

  // Get the star button for the first movie in the search results
  const starButton= await screen.findAllByTestId('starred-link');

  // Click the watch later button
  await userEvent.click(starButton[0]);

  // Button should now be replaced with the remove button
  await waitFor(async () => {
    const unstarButton = await screen.findByTestId('unstar-link')
    expect(unstarButton).toBeInTheDocument();
  });

  // Visit starred page
  await userEvent.click(screen.getByTestId('nav-starred'))

  await waitFor(() => {
    expect(
      screen.getAllByText('Forrest Gump')[0]
    ).toBeInTheDocument();
  });

  // Click Empty List
  userEvent.click(screen.getByText('Remove all starred'))

  // Nothing should be There
  await waitFor(() => {
    expect(screen.getByText(/There are no starred movies./i)).toBeInTheDocument()
  })
});
