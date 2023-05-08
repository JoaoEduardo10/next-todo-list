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
    deleteActualTask: (state) => {
      state.actualTask = {
        boardConnect: '',
        text: '',
        _id: '',
        description: '',
        id: '',
        status: 'pending',
        subTasks: [],
      };
    },
  },
});

export const { setActualTask, deleteActualTask } = taskSlice.actions;
export default taskSlice.reducer;
