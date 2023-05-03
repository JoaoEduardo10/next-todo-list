import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './features/Boards/boardSlice';
import taskReducer from './features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
