import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AccountState } from "./types";
import { fetchCurrentUserAsync, signInUserAsync } from "./actions";

const initialState: AccountState = {
  user: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signInUserAsync.fulfilled, fetchCurrentUserAsync.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(signInUserAsync.rejected, fetchCurrentUserAsync.rejected),
      (_state, action) => {
        console.log(action.payload);
      }
    );
  },
});
