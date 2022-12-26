import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loginAPI, registerAPI } from "../../apis/auth";
import { IDataUser } from "../../interfaces/user";

interface IUser {
  id: number;
  name: string;
  email: string;
  dob: string;
  gender: "F" | "M";
  phoneNumber: string;
  createdAt: string;
  address: string;
}

interface IRole {
  role: string;
}

export interface IAuthState {
  accessToken: string;
  authorities: IRole[];
  user: IUser;
}

const initialState: IAuthState = {
  accessToken: "",
  authorities: [
    {
      role: "",
    },
  ],
  user: {
    id: 0,
    name: "",
    email: "",
    dob: "",
    gender: "F",
    phoneNumber: "",
    createdAt: "",
    address: "",
  },
};

export const LogInAsync = createAsyncThunk("auth/login", async (user: IDataUser) => {
  const response = await loginAPI(user);
  return response.data.data;
});

export const RegisterAsync = createAsyncThunk("auth/register", async (user: IDataUser) => {
  const response = await registerAPI(user);
  return response.data.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogOut: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(LogInAsync.pending, (state) => {
        // console.log(state)
      })
      .addCase(LogInAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.authorities = action.payload.authorities;
        state.user = action.payload.user;
        // console.log(state, action);
      })
      .addCase(LogInAsync.rejected, (state) => {
        // console.log(state);
      });

    // register
    builder
      .addCase(RegisterAsync.pending, (state) => {
        // console.log(state);
      })
      .addCase(RegisterAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        // console.log(state, action);
      })
      .addCase(RegisterAsync.rejected, (state) => {
        // console.log(state);
      });
  },
});

export const { LogOut } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
