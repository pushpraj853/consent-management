import { createSlice } from "@reduxjs/toolkit";

type LoaderDataSlice = {
  isVisible: boolean;
  loaderText?: string;
};

const initialState: LoaderDataSlice = {
  isVisible: false,
  loaderText: "Loading",
};

const loaderDataSlice = createSlice({
  name: "loaderData",
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.isVisible = true;
      state.loaderText = action.payload || "Loading";
    },

    hideLoader: (state) => {
      state.isVisible = false;
      state.loaderText = "Loading";
    },
  },
});

export const { showLoader, hideLoader } = loaderDataSlice.actions;
export const loaderDataReducer = loaderDataSlice.reducer;
