import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './features/Boards/boardSlice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;