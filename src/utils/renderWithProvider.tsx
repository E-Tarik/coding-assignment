import type { FC } from "react";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { movieApi } from "../store/api/movies.api";
import { starredReducer } from "../store/slice/starred.slice";
import { watchLaterReducer } from "../store/slice/watchLater.slice";

import ModalProvider from "../context/ModalContext";

const renderWithProviders = (
  ui: ReactElement,
  {
    store = configureStore({
      reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        starred: starredReducer,
        watchLater: watchLaterReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware),
    }),
    ...renderOptions
  } = {}
) => {
  setupListeners(store.dispatch);

  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ModalProvider>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithProviders;
