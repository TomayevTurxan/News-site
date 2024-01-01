import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsersState {
  users: [];
}


const initialState: UsersState = {
  users: [],
};

const userSlices = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userSlices.actions;

export default userSlices.reducer;
