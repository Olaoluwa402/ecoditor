import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "./auth.service";
import { toast } from "react-toastify";
import { getUserInfo } from "../../../util";

interface AuthState {
  user: any | null;
  error: string | null;
  loading: boolean;
  success: boolean;
  loginReset: boolean;
} 

export const loginAction = createAsyncThunk<
  any,
  { username_or_email: string; password: string }
>("auth/login", async ({ username_or_email, password }, thunkAPI) => {
  try {
    const result = await loginService({ username_or_email, password });
    console.log(result, "login response");
    //persist data
    localStorage.setItem("user", JSON.stringify(result));
    return result;
  } catch (error: any) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    toast.warning(`${message}`);
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutAction = () => (dispatch: any) => {
  // Clear user data from the state
  dispatch(reset());
  // Remove user information from local storage
  localStorage.removeItem("user");
  console.log("cleared");
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserInfo(null),
    error: null,
    loading: false,
    success: false,
    loginReset: false,
  } as AuthState,
  reducers: {
    // non-asynchronous reducers go here
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
      state.loginReset = true;
    },
    loginIsReset: (state) => {
      state.loginReset = true;
    },
    clearErrorLogin: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.loginReset = false;
      })
      .addCase(loginAction.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
        }
        state.loading = false;
        state.success = false;
        state.user = null;
      });
  },
});

export const { reset, clearErrorLogin, loginIsReset } = authSlice.actions;

export default authSlice.reducer;
