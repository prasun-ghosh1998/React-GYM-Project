import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import planReducer from "./slices/plan.slice";
import workoutReducer from "./slices/workout.slice";
import memberReducer from "./slices/member.slice";
import trainerReducer from "./slices/trainer.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plan: planReducer,
    workout: workoutReducer,
    member: memberReducer,
    trainer: trainerReducer,
  },
});
