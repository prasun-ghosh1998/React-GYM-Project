import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  storage,
  tables_ID,
} from "../../appwrite/appwriteConfig";
import { Query, ID } from "appwrite";

const initialState = {
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
  async ({ params }: any, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 5 } = params;

      const res = await databases.listDocuments(
        DATABASE_ID,
        tables_ID.TRAINERS,
        [Query.limit(limit), Query.offset((page - 1) * limit)]
      );

      return {
        list: res.documents,
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
  async (data: any, { rejectWithValue }) => {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        tables_ID.TRAINERS,
        ID.unique(),
        { ...data, status: "publish" }
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE
export const deleteTrainer = createAsyncThunk(
  "trainer/delete",
  async ({ id, imageId }: any, { rejectWithValue }) => {
    try {
      if (imageId) {
        try {
          await storage.deleteFile(BUCKET_ID, imageId);
        } catch {}
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
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        tables_ID.TRAINERS,
        id,
        data
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// STATUS
export const statusChangeTrainer = createAsyncThunk(
  "trainer/status",
  async ({ id, currentStatus }: any, { rejectWithValue }) => {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        tables_ID.TRAINERS,
        id,
        {
          status: currentStatus === "publish" ? "draft" : "publish",
        }
      );
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
      if (state.page < totalPages) state.page += 1;
    },
    setPrevTrainer: (state) => {
      if (state.page > 1) state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(trainerList.pending, (state) => {
        state.loading = true;
      })
      .addCase(trainerList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(addTrainer.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.total += 1;
      })
      .addCase(deleteTrainer.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item: any) => item.$id !== action.payload
        );
        state.total -= 1;
      })
      .addCase(updateTrainer.fulfilled, (state, action) => {
        const i = state.list.findIndex(
          (x: any) => x.$id === action.payload.$id
        );
        if (i !== -1) state.list[i] = action.payload;
      })
      .addCase(statusChangeTrainer.fulfilled, (state, action) => {
        const i = state.list.findIndex(
          (x: any) => x.$id === action.payload.$id
        );
        if (i !== -1) state.list[i] = action.payload;
      });
  },
});

export const {
  setLimitTrainer,
  setNextTrainer,
  setPrevTrainer,
} = trainerSlice.actions;

export default trainerSlice.reducer;