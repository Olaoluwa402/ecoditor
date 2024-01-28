import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./combinedSlices";

// Create the store with type information
export const store = configureStore({
  reducer: reducers,
});

// Define the root state type
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
