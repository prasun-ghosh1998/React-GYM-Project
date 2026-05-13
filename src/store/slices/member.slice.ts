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

// Initial State
const initialState:InitialStateType = {
  list:[],
  loading: false,
  error: null,
  page: 1,
  limit: 5,
  total: 0,
};

// ✅ GET MEMBERS (ONLY members collection)
export const memberList = createAsyncThunk(
  "member/list",
  async ({ params }: any, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 5 } = params;

      const res = await databases.listDocuments(
        DATABASE_ID,
        tables_ID.MEMBERS
      );

      const formatted = res.documents.map((user: any) => ({
        ...user,
        name: user.name || "N/A",
        phone: user.phone || "N/A",
        status: user.status || "active",
      }));

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

// ✅ ADD MEMBER
export const addMember = createAsyncThunk(
  "member/add",
  async (data: any, { rejectWithValue }) => {
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
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ DELETE
export const deleteMember = createAsyncThunk(
  "member/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        tables_ID.MEMBERS,
        id
      );
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ UPDATE
export const updateMember = createAsyncThunk(
  "member/update",
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.MEMBERS,
        id,
        data
      );
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ STATUS
export const statusChange = createAsyncThunk(
  "member/status",
  async ({ id, currentStatus }: any, { rejectWithValue }) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.MEMBERS,
        id,
        {
          status: currentStatus === "active" ? "inactive" : "active",
        }
      );
      return res;
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
      if (state.page < totalPages) state.page += 1;
    },
    setPrev: (state) => {
      if (state.page > 1) state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(memberList.pending, (state) => {
        state.loading = true;
      })
      .addCase(memberList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.total = action.payload.total;
        state.page = action.payload.page;
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
        state.list = state.list.filter(
          (item: any) => item.$id !== action.payload
        );
        state.total -= 1;
      })

      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item: any) => item.$id === action.payload.$id
        );
        if (index !== -1) state.list[index] = action.payload;
      })

      .addCase(statusChange.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item: any) => item.$id === action.payload.$id
        );
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export const { setLimit, setNext, setPrev } = memberSlice.actions;
export default memberSlice.reducer;