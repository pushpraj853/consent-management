import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserList } from "../../helpers/http-calls";
import { UserDataType } from "../../types";

export const getAndUpdateUserThunk = createAsyncThunk<UserDataType>(
  "userData/getAndUpdateUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getUserList();
      return data as UserDataType;
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue({ message });
    }
  },
);
