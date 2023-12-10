import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    isLoggedIn: sessionStorage.getItem("loggedIn") === "true",
    _id: "",
    fname: "",
    email: "",
    isAdmin: false,
  },
  reducers: {
    loginUser(state, action) {
      const { _id, fname, email, isAdmin } = action.payload;
      state._id = _id;
      state.fname = fname;
      state.email = email;
      state.isAdmin = isAdmin;

      console.log(
        "global state contains: ",
        state.isLoggedIn,
        state.isAdmin,
        state._id,
        state.fname,
        state.email
      );
    },
  },
});

export default UserSlice.reducer;
export const { loginUser } = UserSlice.actions;
