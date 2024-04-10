import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../app/models/users";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";

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
  }
);
