import { configureStore } from "@reduxjs/toolkit";

import { movieApi } from "./api/movies.api";

import { starredReducer } from "./slice/starred.slice";
import { watchLaterReducer } from "./slice/watchLater.slice";

const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    starred: starredReducer,
    watchLater: watchLaterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
