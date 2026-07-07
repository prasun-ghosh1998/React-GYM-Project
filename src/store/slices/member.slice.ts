import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DATABASE_ID,
  databases,
  tables_ID,
} from "../../appwrite/appwriteConfig";
import { ID } from "appwrite";
import type { MemberType } from "../../typeScript/type/member.type";

type InitialStateType = {
  list: MemberType[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
};

const initialState: InitialStateType = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  limit: 5,
  total: 0,
};

const formatMember = (user: any): MemberType => ({
  $id: user.$id,
  name: user.name || "N/A",
  email: user.email || "N/A",
  phone: user.phone || "N/A",
  status: user.status || "active",
  plan: user.plan || "",
});

export const memberList = createAsyncThunk(
  "member/list",
  async ({ params }: any, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 5 } = params;

      const res = await databases.listDocuments(DATABASE_ID, tables_ID.MEMBERS);

      const formatted: MemberType[] = res.documents.map(formatMember);

      const start = (page - 1) * limit;
      const paginated = formatted.slice(start, start + limit);

      return {
        list: paginated,
        total: formatted.length,
        page,
        limit,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMember = createAsyncThunk(
  "member/add",
  async (
    data: Omit<MemberType, "$id" | "status">,
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        tables_ID.MEMBERS,
        ID.unique(),
        {
          ...data,
          status: "active",
          source: "admin",
        }
      );

      return formatMember(res);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMember = createAsyncThunk(
  "member/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(DATABASE_ID, tables_ID.MEMBERS, id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMember = createAsyncThunk(
  "member/update",
  async (
    { id, data }: { id: string; data: Partial<Omit<MemberType, "$id">> },
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.MEMBERS,
        id,
        data
      );

      return formatMember(res);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const statusChange = createAsyncThunk(
  "member/status",
  async (
    { id, currentStatus }: { id: string; currentStatus: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.MEMBERS,
        id,
        {
          status: currentStatus === "active" ? "inactive" : "active",
        }
      );

      return formatMember(res);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.page = 1;
    },

    setNext: (state) => {
      const totalPages = Math.ceil(state.total / state.limit);

      if (state.page < totalPages) {
        state.page += 1;
      }
    },

    setPrev: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(memberList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(memberList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })

      .addCase(memberList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addMember.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.total += 1;
      })

      .addCase(deleteMember.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.$id !== action.payload);

        if (state.total > 0) {
          state.total -= 1;
        }
      })

      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.$id === action.payload.$id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(statusChange.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.$id === action.payload.$id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export const { setLimit, setNext, setPrev } = memberSlice.actions;

export default memberSlice.reducer;