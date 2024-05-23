import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { BasketState } from "./types";
import {
  addBasketItemAsync,
  fetchBasketAsync,
  removeBasketItemAsync,
} from "./actions";
import { Basket } from "../../app/models/basket";

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<Basket | null>) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });

    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });

    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      state.status = "idle";
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket?.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);
      if (state.basket?.items.length === 0) {
        state.basket = null;
      }
    });

    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    builder.addMatcher(
      isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled),
      (state, action: PayloadAction<Basket>) => {
        state.basket = action.payload;
        state.status = "idle";
      }
    );

    builder.addMatcher(
      isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected),
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
  },
});

export const { setBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
