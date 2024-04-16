import { RootState } from "../store";

export const basketSelector = (state: RootState) => {
  return state.basket.basket;
};

export const statusSelector = (state: RootState) => {
  return state.basket.status;
};
