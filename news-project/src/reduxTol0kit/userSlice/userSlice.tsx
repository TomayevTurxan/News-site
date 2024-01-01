import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: [];
}


const userFromLocalStorage = localStorage.getItem("user");
const initialState: UserState = {
    user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<[]>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
