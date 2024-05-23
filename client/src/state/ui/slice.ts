import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "./types";

const initialState: UiState = {
  url: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});

export default uiSlice.reducer;
