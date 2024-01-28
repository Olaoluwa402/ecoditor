import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerService } from "./auth.service";
import { toast } from "react-toastify";

interface User {
  data: any;
}

interface AuthRegisterState {
  user: User | null;
  error: string | null;
  loading: boolean;
  success: boolean;
}

export const createUserAction = createAsyncThunk<
  User,
  { email: string; password: string; username: string }
>("auth/register", async ({ email, password, username }, thunkAPI) => {
  try {
    const response = await registerService({ email, password, username });
    return response;
  } catch (error: any) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`${message}`);
    return thunkAPI.rejectWithValue(message) as any;
  }
});

const initialState: AuthRegisterState = {
  user: null,
  error: null,
  loading: false,
  success: false,
};

export const authRegisterSlice = createSlice({
  name: "authRegister",
  initialState,
  reducers: {
    // Non-asynchronous reducers go here
    resetRegister: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },

    clearErrorRegister: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(createUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.user = null;
      });
  },
});

export const { resetRegister, clearErrorRegister } = authRegisterSlice.actions;

export default authRegisterSlice.reducer;
