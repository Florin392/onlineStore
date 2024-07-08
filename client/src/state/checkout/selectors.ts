import { RootState } from "../store";

export const selectAddress = (state: RootState) => state.checkout.address;
export const selectPayment = (state: RootState) => state.checkout.payment;
export const selectLoading = (state: RootState) => state.checkout.loading;

export const selectError = (state: RootState) => state.checkout.error;
