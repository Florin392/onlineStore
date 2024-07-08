import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../app/models/users";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { setUser, signOut } from "./slice";
import { clearBasket, setBasket } from "../basket/slice";
import { clearAddress } from "../checkout/slice";
import { AppDispatch } from "../store";

export const signInUserAsync = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      // set the basket and ...user (user,token) into {user}
      if (basket) thunkAPI.dispatch(setBasket(basket));
      // use the basket to update the state in Redux store
      localStorage.setItem("user", JSON.stringify(user));
      //   dispatchWithRetry
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
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
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

export const asyncSignOut = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  "account/asyncSignOut",
  async (_, { dispatch }) => {
    dispatch(clearBasket());
    dispatch(clearAddress());
    dispatch(signOut());
  }
);