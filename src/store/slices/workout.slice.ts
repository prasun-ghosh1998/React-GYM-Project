import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  storage,
  tables_ID,
} from "../../appwrite/appwriteConfig";
import { Query, ID } from "appwrite";
import type { Workout, WorkoutState } from "../../typeScript/type/workout.type";

const initialState: WorkoutState = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  limit: 5,
  total: 0,
};

// Get Workout
export const workoutList = createAsyncThunk(
  "workout/list",
  async (
    payload: { params?: { page?: number; limit?: number } } = {},
    { rejectWithValue }
  ) => {
    try {
      const { page = 1, limit = 5 } = payload.params || {};

      const res = await databases.listDocuments(
        DATABASE_ID,
        tables_ID.WORKOUTS,
        [Query.limit(limit), Query.offset((page - 1) * limit)]
      );

      return {
        list: res.documents as unknown as Workout[],
        total: res.total,
        page,
        limit,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Workout
export const addWorkout = createAsyncThunk(
  "workout/add",
  async (
    data: Omit<Workout, "$id" | "status">,
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        tables_ID.WORKOUTS,
        ID.unique(),
        {
          ...data,
          status: "publish",
        }
      );

      return res as unknown as Workout;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Workout
export const deleteWorkout = createAsyncThunk(
  "workout/delete",
  async (
    { id, imageId }: { id: string; imageId?: string },
    { rejectWithValue }
  ) => {
    try {
      if (imageId) {
        try {
          await storage.deleteFile(BUCKET_ID, imageId);
        } catch {
          console.warn("Image not found");
        }
      }

      await databases.deleteDocument(DATABASE_ID, tables_ID.WORKOUTS, id);

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Workout
export const updateWorkout = createAsyncThunk(
  "workout/update",
  async (
    { id, data }: { id: string; data: Partial<Omit<Workout, "$id">> },
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.WORKOUTS,
        id,
        data
      );

      return res as unknown as Workout;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Status Change
export const statusChangeWorkout = createAsyncThunk(
  "workout/status",
  async (
    { id, currentStatus }: { id: string; currentStatus: "publish" | "draft" },
    { rejectWithValue }
  ) => {
    try {
      const res = await databases.updateDocument(
        DATABASE_ID,
        tables_ID.WORKOUTS,
        id,
        {
          status: currentStatus === "publish" ? "draft" : "publish",
        }
      );

      return res as unknown as Workout;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setLimitWorkout: (state, action) => {
      state.limit = action.payload;
      state.page = 1;
    },

    setNextWorkout: (state) => {
      const totalPages = Math.ceil(state.total / state.limit);

      if (state.page < totalPages) {
        state.page += 1;
      }
    },

    setPrevWorkout: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(workoutList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(workoutList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })

      .addCase(workoutList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
        state.total += 1;
      })

      .addCase(addWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) => item.$id !== action.payload
        );
        state.total -= 1;
      })

      .addCase(updateWorkout.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.$id === action.payload.$id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(statusChangeWorkout.fulfilled, (state, action) => {
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
  setLimitWorkout,
  setNextWorkout,
  setPrevWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;