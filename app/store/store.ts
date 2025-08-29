import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./token/tokenSlice";

export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
  },
});
