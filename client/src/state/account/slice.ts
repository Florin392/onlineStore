import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AccountState } from "./types";
import { fetchCurrentUserAsync, signInUserAsync } from "./actions";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";

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
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUserAsync.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Session expired - please login again");
      router.navigate("/");
    });
    builder.addMatcher(
      isAnyOf(signInUserAsync.fulfilled, fetchCurrentUserAsync.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(signInUserAsync.rejected), (_state, action) => {
      throw action.payload;
    });
  },
});

export const { signOut, setUser } = accountSlice.actions;
