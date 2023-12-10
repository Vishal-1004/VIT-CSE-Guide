import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/userSlice.js";

const store = configureStore({
  reducer: {
    users: UserSlice,
  },
});

export default store;
