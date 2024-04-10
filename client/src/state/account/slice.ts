import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AccountState } from "./types";
import { fetchCurrentUserAsync, signInUserAsync } from "./actions";
import { router } from "../../app/router/Routes";

const initialState: AccountState = {
  user: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/");
    },
  },
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

export const { signOut } = accountSlice.actions;
