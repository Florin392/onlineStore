import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../app/models/users";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { setUser } from "./slice";

export const signInUserAsync = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.login(data);
      //   dispatchWithRetry
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUserAsync = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const user = await agent.Account.currentUser();
      //   dispatchWithRetry
      //   overwrite the user in local storage and
      // replace it with updated token get it from api
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
      // if no user key in localstorage, no call in network
    },
  }
);
