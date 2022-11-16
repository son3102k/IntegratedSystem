import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loginAPI, registerAPI } from "../../apis/auth";
import { IDataUser } from "../../interfaces/user";

export interface CounterState {
  token: string | null;
  isLoggingIn: boolean;
  isRegistering: boolean;
  registerSuccess: boolean;
  user: string | null;
  error: string | null;
}

const initialState: CounterState = {
  token: null,
  isLoggingIn: false,
  isRegistering: false,
  registerSuccess: false,
  user: null,
  error: null,
};

export const LogIn = createAsyncThunk("auth/login", async (user: IDataUser) => {
  const response = await loginAPI(user);
  console.log(response);
  return response.data;
});

export const Register = createAsyncThunk("auth/register", async (user: IDataUser) => {
  const response = await registerAPI(user);
  console.log(response);
  return response.data;
});

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
      .addCase(LogIn.pending, (state) => {
        console.log(state);
      })
      .addCase(LogIn.fulfilled, (state, action) => {
        // state.token = action.payload.token;
        console.log(state, action);
      })
      .addCase(LogIn.rejected, (state) => {
        console.log(state);
      });

    // register
    builder
      .addCase(Register.pending, (state) => {
        console.log(state);
      })
      .addCase(Register.fulfilled, (state, action) => {
        // state.token = action.payload.token;
        console.log(state, action);
      })
      .addCase(Register.rejected, (state) => {
        console.log(state);
      });
  },
});

// export const {} = authSlice.actions;
export const selectAuthToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
