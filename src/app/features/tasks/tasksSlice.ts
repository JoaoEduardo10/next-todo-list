import { TTasks } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initalState';

export const taskSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setActualTask: (state, action: PayloadAction<TTasks>) => {
      state.actualTask = action.payload;
    },
  },
});

export const { setActualTask } = taskSlice.actions;
export default taskSlice.reducer;
