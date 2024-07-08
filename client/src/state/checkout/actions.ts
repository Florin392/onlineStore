import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Address } from "./types";

export const fetchAddressAsync = createAsyncThunk<Address, void>(
  "checkout/fetchAddress",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Account.fetchAddress();
      return response as Address;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const saveAddressAsync = createAsyncThunk<Address, Address>(
  "checkout/saveAddress",
  async (address, thunkAPI) => {
    try {
      await agent.Account.saveAddress(address);
      return address;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createPaymentIntentAsync = createAsyncThunk<void, void>(
  "checkout/createPaymentIntent",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Payments.createPaymentIntent();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
