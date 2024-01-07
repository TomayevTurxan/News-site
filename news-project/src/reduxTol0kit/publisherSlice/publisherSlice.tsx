import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface publisherType{
    id: string | number,
    publisherName: string,
    fullName: string,
    email: string,  
    password: string,
}
interface publisherState {
  publisher: null | publisherType[]; 
}


const publisherFromLocalStorage = localStorage.getItem("publisher");
const initialState: publisherState = {
  publisher: publisherFromLocalStorage ? JSON.parse(publisherFromLocalStorage) : null,
};

const publisherSlice = createSlice({
  name: "publisher",
  initialState,
  reducers: {
    setPublisher: (state, action: PayloadAction<null | publisherType[]>) => {
      state.publisher = action.payload;

      if (action.payload) {
        localStorage.setItem("publisher", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("publisher");
      }
    },
  },
});

export const { setPublisher } = publisherSlice.actions;

export default publisherSlice.reducer;
