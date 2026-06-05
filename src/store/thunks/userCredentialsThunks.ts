import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "../../api/http-calls";
import { UserDataType } from "../../types";

export const getAndUpdateUserThunk = createAsyncThunk<UserDataType>(
  "userData/getAndUpdateUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getUserDetails();
      return data as UserDataType;
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue({ message });
    }
  }
);
