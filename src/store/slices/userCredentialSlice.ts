import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginAuthDataType } from "../../types";

type UserCredentialState = LoginAuthDataType | null;

const initialState = null as UserCredentialState;

const userCredentialSlice = createSlice({
  name: "userCredential",
  initialState,
  reducers: {
    addUserCredential: (_state, action: PayloadAction<LoginAuthDataType>): UserCredentialState =>
      action.payload,

    clearUserCredential: (): UserCredentialState => null,
  },
});

export const { addUserCredential, clearUserCredential } = userCredentialSlice.actions;

export const userCredentialReducer = userCredentialSlice.reducer;
