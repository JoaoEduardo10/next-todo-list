import { configureStore } from '@reduxjs/toolkit';
import { PreloadedState } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import boardsReducer from './features/Boards/boardSlice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
});

const rootReducer = combineReducers({
  boads: boardsReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {},
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;
