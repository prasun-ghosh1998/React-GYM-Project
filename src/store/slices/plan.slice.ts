import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DATABASE_ID,
  databases,
  tables_ID,
} from "../../appwrite/appwriteConfig";
import { Query } from "appwrite";
import { ID } from "appwrite";

//  Initial State
const initialState = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  limit: 5,
  total: 0,
};

//  Get Plans
export const planList = createAsyncThunk(
  "plan/list",
  async (payload: any = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 5 } = payload?.params || {};

      const res = await databases.listDocuments(
        DATABASE_ID,
        tables_ID.PLANS,
        [Query.limit(limit), Query.offset((page - 1) * limit)]
      );

      return {
        list: res.documents,
        total: res.total,
        page,
        limit,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPlan = createAsyncThunk(
  "plan/add",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        tables_ID.PLANS,
        ID.unique(),
        {
          ...data,
          status: "publish",
        },
      );

      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deletePlan = createAsyncThunk(
  "plan/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(DATABASE_ID, tables_ID.PLANS, id);

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updatePlan = createAsyncThunk(
  "plan/update",
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.PLANS,
        id,
        data,
      );

      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const statusChange = createAsyncThunk(
  "plan/status",
  async ({ id, currentStatus }: any, { rejectWithValue }) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.PLANS,
        id,
        {
          status: currentStatus === "publish" ? "draft" : "publish",
        },
      );

      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const planSlice = createSlice({
  name: "plan",
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

      .addCase(planList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(planList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(planList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
        state.total += 1;
      })

      .addCase(addPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deletePlan.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item: any) => item.$id !== action.payload,
        );
        state.total -= 1;
      })

      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item: any) => item.$id === action.payload.$id,
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(statusChange.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item: any) => item.$id === action.payload.$id,
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export const { setLimit, setNext, setPrev } = planSlice.actions;

export default planSlice.reducer;
