import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import renderWithProviders from "./utils/renderWithProvider";

import App from "./App";

describe("When I navigate to the home page", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    const getClientRects = HTMLElement.prototype.getClientRects;
    HTMLElement.prototype.getClientRects = function () {
      return {
        ...getClientRects.apply(this),
        length: 1,
      };
    };

    renderWithProviders(<App />);
  });

  it("renders watch later link", () => {
    const linkElement = screen.getByText(/watch later/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("allows me to search for a movie and view the trailer", async () => {
    await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
    await waitFor(() => {
      expect(
        screen.getAllByText("Through the Eyes of Forrest Gump")[0]
      ).toBeInTheDocument();
    });
    const viewTrailerBtn = screen.getAllByText("View Trailer")[0];
    await userEvent.click(viewTrailerBtn);
    await waitFor(() => {
      expect(screen.getByTestId("youtube-player")).toBeInTheDocument();
    });
  });

  it("renders the watch later component", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText(/watch later/i));
    expect(
      screen.getByText(/You have no movies saved to watch later/i)
    ).toBeInTheDocument();
  });

  it("renders the starred component", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByTestId("nav-starred"));
    expect(
      screen.getByText(/There are no starred movies/i)
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("starred")).toBeInTheDocument();
    });
  });
});
