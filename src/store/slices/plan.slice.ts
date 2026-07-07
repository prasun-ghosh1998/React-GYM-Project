import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DATABASE_ID,
  databases,
  tables_ID,
} from "../../appwrite/appwriteConfig";
import { Query, ID } from "appwrite";

export type PlanType = {
  $id: string;
  title: string;
  price: number;
  duration: number;
  status: "publish" | "draft";
};

type InitialStateType = {
  list: PlanType[];
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

// Get Plans
export const planList = createAsyncThunk(
  "plan/list",
  async (
    payload: { params?: { page?: number; limit?: number } } = {},
    { rejectWithValue }
  ) => {
    try {
      const { page = 1, limit = 5 } = payload.params || {};

      const res = await databases.listDocuments(
        DATABASE_ID,
        tables_ID.PLANS,
        [Query.limit(limit), Query.offset((page - 1) * limit)]
      );

      return {
        list: res.documents as unknown as PlanType[],
        total: res.total,
        page,
        limit,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Plan
export const addPlan = createAsyncThunk(
  "plan/add",
  async (
    data: Omit<PlanType, "$id" | "status">,
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        tables_ID.PLANS,
        ID.unique(),
        {
          ...data,
          status: "publish",
        }
      );

      return res as unknown as PlanType;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Plan
export const deletePlan = createAsyncThunk(
  "plan/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(DATABASE_ID, tables_ID.PLANS, id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Plan
export const updatePlan = createAsyncThunk(
  "plan/update",
  async (
    { id, data }: { id: string; data: Partial<Omit<PlanType, "$id">> },
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.PLANS,
        id,
        data
      );

      return res as unknown as PlanType;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Status Change
export const statusChange = createAsyncThunk(
  "plan/status",
  async (
    { id, currentStatus }: { id: string; currentStatus: "publish" | "draft" },
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.PLANS,
        id,
        {
          status: currentStatus === "publish" ? "draft" : "publish",
        }
      );

      return res as unknown as PlanType;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
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
      // Plan List
      .addCase(planList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(planList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })

      .addCase(planList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Plan
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

      // Delete Plan
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) => item.$id !== action.payload
        );
        state.total -= 1;
      })

      // Update Plan
      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.$id === action.payload.$id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // Status Change
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

export const { setLimit, setNext, setPrev } = planSlice.actions;

export default planSlice.reducer;