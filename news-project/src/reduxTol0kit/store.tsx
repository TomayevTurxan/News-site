
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlices/usersSlice';
import userReducer from "./userSlice/userSlice"
const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
  },
});

export default store;