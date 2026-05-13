import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "../../appwrite/authService";
import {
  account,
  COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../../appwrite/appwriteConfig";
import { Query } from "appwrite";
import Cookies from "js-cookie";

const user = Cookies.get("user")
  ? JSON.parse(Cookies.get("user") as string)
  : null;
const token = Cookies.get("token") === "true";
const role = Cookies.get("role") || null;
const initialState = {
  loading: false,
  error: null as string | null,
  user: user,
  role: role,
  token: token as boolean | null,
};

//  REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: any, { rejectWithValue }) => {
    try {
      return await authService.registerUser(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//  LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const existingUser = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("email", data.email)],
      );
      console.log("existing user", existingUser);

      if (existingUser.total === 0) {
        return rejectWithValue({ success: false, message: "User not found!" });
      }

      await account.createEmailPasswordSession({
        email: data.email,
        password: data.password,
      });
      const row = existingUser.documents[0];
      const user = {
        userId: row.userId,
        name: row.name,
        email: row.email,
        role: row.role,
      };
      return { success: true, message: "Login Successfull", user };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//  LOGOUT
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authService.logoutUser();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      Cookies.remove("role");
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.href = "/";
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
        console.log("loginFullfil", action.payload);
        state.role = action.payload.user.role;
        state.token = true;
        state.user = action.payload.user;
        Cookies.set("token", "true");
        Cookies.set("role", action.payload.user.role);
        Cookies.set("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
      state.role = null;
      state.user = null;
      Cookies.remove("role");
      Cookies.remove("token");
      Cookies.remove("user");
      });
  },
});

export default authSlice.reducer;
