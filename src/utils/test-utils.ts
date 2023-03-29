import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../src/app/store';

export const createTestStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: false,
  });

  return store;
};
