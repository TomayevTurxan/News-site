import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserType{
    id: string | number,
    username: string,
    fullName: string,
    imgUrl: string,
    email: string,  
    password: string,
    isAdmin: boolean,
}
interface UserState {
  user: null | UserType[]; 
}


const userFromLocalStorage = localStorage.getItem("user");
const initialState: UserState = {
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<null | UserType[]>) => {
      state.user = action.payload;

      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
