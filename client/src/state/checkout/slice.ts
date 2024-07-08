import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckoutState, Address } from "./types";
import {
  fetchAddressAsync,
  saveAddressAsync,
  createPaymentIntentAsync,
} from "./actions";

const initialState: CheckoutState = {
  address: null,
  payment: null,
  loading: false,
  error: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<Address>) {
      state.address = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearAddress(state) {
      state.address = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddressAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddressAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.address = action.payload;
    });
    builder.addCase(fetchAddressAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(saveAddressAsync.fulfilled, (state, action) => {
      state.address = action.payload;
    });
    builder.addCase(createPaymentIntentAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPaymentIntentAsync.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createPaymentIntentAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setAddress, setLoading,clearAddress } = checkoutSlice.actions;
