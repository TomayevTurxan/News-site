
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlices/usersSlice';
import userReducer from "./userSlice/userSlice"
import publishersReducer from "./publisherSlices/publishersSlice"
import publisherReducer from './publisherSlice/publisherSlice';
const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    publishers: publishersReducer,
    publisher: publisherReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;