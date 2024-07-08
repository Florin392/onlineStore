import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { AccountState } from "./types";
import { fetchCurrentUserAsync, signInUserAsync } from "./actions";
import { router } from "../../AppRoutes";
import { toast } from "react-toastify";
import { clearAddress } from "../checkout/slice"; // Import clearAddress action
import { AppDispatch } from "../store";

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
    setUser: (state, action: PayloadAction<any>) => {
      const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      const roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
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
        const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
        const roles =
          claims[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        state.user = {
          ...action.payload,
          roles: typeof roles === "string" ? [roles] : roles,
        };
      }
    );
    builder.addMatcher(isAnyOf(signInUserAsync.rejected), (_state, action) => {
      throw action.payload;
    });
  },
});

export const { signOut, setUser } = accountSlice.actions;

export const asyncSignOut = () => (dispatch: AppDispatch) => {
  dispatch(clearAddress());
  dispatch(signOut());
};
