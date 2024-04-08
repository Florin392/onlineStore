import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./basket/slice";
import { catalogSlice } from "./catalog/slice";

export const reducer = {};

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
