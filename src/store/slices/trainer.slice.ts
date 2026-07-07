import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  storage,
  tables_ID,
} from "../../appwrite/appwriteConfig";
import { Query, ID } from "appwrite";

export type Trainer = {
  $id: string;
  name: string;
  title: string;
  img: string;
  imageId?: string;
  status: "publish" | "draft";
};

export type TrainerState = {
  list: Trainer[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
};

const initialState: TrainerState = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  limit: 5,
  total: 0,
};

// GET
export const trainerList = createAsyncThunk(
  "trainer/list",
  async (
    payload: { params?: { page?: number; limit?: number } } = {},
    { rejectWithValue }
  ) => {
    try {
      const { page = 1, limit = 5 } = payload.params || {};

      const res = await databases.listDocuments(
        DATABASE_ID,
        tables_ID.TRAINERS,
        [Query.limit(limit), Query.offset((page - 1) * limit)]
      );

      return {
        list: res.documents as unknown as Trainer[],
        total: res.total,
        page,
        limit,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ADD
export const addTrainer = createAsyncThunk(
  "trainer/add",
  async (
    data: Omit<Trainer, "$id" | "status">,
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        tables_ID.TRAINERS,
        ID.unique(),
        {
          ...data,
          status: "publish",
        }
      );

      return res as unknown as Trainer;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE
export const deleteTrainer = createAsyncThunk(
  "trainer/delete",
  async (
    { id, imageId }: { id: string; imageId?: string },
    { rejectWithValue }
  ) => {
    try {
      if (imageId) {
        try {
          await storage.deleteFile(BUCKET_ID, imageId);
        } catch {
          // ignore image delete error
        }
      }

      await databases.deleteDocument(
        DATABASE_ID,
        tables_ID.TRAINERS,
        id
      );

      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE
export const updateTrainer = createAsyncThunk(
  "trainer/update",
  async (
    { id, data }: { id: string; data: Partial<Omit<Trainer, "$id">> },
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.TRAINERS,
        id,
        data
      );

      return res as unknown as Trainer;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// STATUS
export const statusChangeTrainer = createAsyncThunk(
  "trainer/status",
  async (
    {
      id,
      currentStatus,
    }: { id: string; currentStatus: "publish" | "draft" },
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.TRAINERS,
        id,
        {
          status: currentStatus === "publish" ? "draft" : "publish",
        }
      );

      return res as unknown as Trainer;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const trainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {
    setLimitTrainer: (state, action) => {
      state.limit = action.payload;
      state.page = 1;
    },

    setNextTrainer: (state) => {
      const totalPages = Math.ceil(state.total / state.limit);

      if (state.page < totalPages) {
        state.page += 1;
      }
    },

    setPrevTrainer: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(trainerList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(trainerList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })

      .addCase(trainerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addTrainer.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
        state.total += 1;
      })

      .addCase(addTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteTrainer.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) => item.$id !== action.payload
        );
        state.total -= 1;
      })

      .addCase(updateTrainer.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.$id === action.payload.$id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(statusChangeTrainer.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.$id === action.payload.$id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export const {
  setLimitTrainer,
  setNextTrainer,
  setPrevTrainer,
} = trainerSlice.actions;

export default trainerSlice.reducer;