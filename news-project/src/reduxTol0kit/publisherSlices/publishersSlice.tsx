import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PublishersState {
  publishers: [];
}


const initialState: PublishersState = {
  publishers: [],
};

const publisherSlices = createSlice({
  name: 'publishers',
  initialState,
  reducers: {
    setPublishers: (state, action: PayloadAction<[]>) => {
      state.publishers = action.payload;
    },
  },
});

export const { setPublishers } = publisherSlices.actions;

export default publisherSlices.reducer;
