import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./basket/slice";
import { catalogSlice } from "./catalog/slice";
import { accountSlice } from "./account/slice";
import { uiSlice } from "./ui/slice";
import { checkoutSlice } from "./checkout/slice";

export const reducer = {};

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    catalog: catalogSlice.reducer,
    account: accountSlice.reducer,
    ui: uiSlice.reducer,
    checkout: checkoutSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
