import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils';
import App from '../../App';

describe('<Movie />', () => {
  beforeEach(() => {
    const portalContainer = document.createElement('div');
    portalContainer.id = 'modal-root';
    document.body.appendChild(portalContainer);
  });

  it('should view trailer', async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump');
    await waitFor(() => {
      expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument();
    });

    const viewTrailerBtn = screen.getAllByText('View Trailer')[0];
    await userEvent.click(viewTrailerBtn);

    const youtubePlayer = await screen.findByTestId('youtube-player');
    await waitFor(() => {
      expect(youtubePlayer).toBeInTheDocument();
    })
  });
});
