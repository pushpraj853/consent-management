import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "../../types";
import { errorToast } from "../../utils";
import { getAndUpdateUserThunk } from "../thunks/userCredentialsThunks";

type AddUserCredentialActionType = {
  token: string | null;
  user: UserDataType | null;
};

const initialState: AddUserCredentialActionType = {
  token: null,
  user: null,
};

const userCredentialSlice = createSlice({
  name: "userCredential",
  initialState,
  reducers: {
    addUserCredential: (state, action: PayloadAction<AddUserCredentialActionType>) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },

    updateUserData: (state, action: PayloadAction<UserDataType | null>) => {
      return {
        ...state,
        user: action.payload,
      };
    },

    updateUserToken: (state, action: PayloadAction<string | null>) => {
      return {
        ...state,
        token: action.payload,
      };
    },

    clearUserCredential: (state) => {
      return {
        ...state,
        token: null,
        user: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAndUpdateUserThunk.fulfilled, (state, action) => {
        return {
          ...state,
          user: action.payload,
        };
      })

      .addCase(getAndUpdateUserThunk.rejected, (_, action) => {
        errorToast(action.payload);
      });
  },
});

// actions export
export const { addUserCredential, updateUserData, updateUserToken, clearUserCredential } =
  userCredentialSlice.actions;

// reducer exports
export const userCredentialReducer = userCredentialSlice.reducer;
