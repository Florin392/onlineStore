import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./basket/slice";
import { catalogSlice } from "./catalog/slice";
import { accountSlice } from "./account/slice";

export const reducer = {};

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    catalog: catalogSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
