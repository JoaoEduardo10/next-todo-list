import { TBoard } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initalState';

export const boardsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<TBoard>) => {
      state.allBoards.push(action.payload);
    },
    setActualBoard: (state, action: PayloadAction<TBoard>) => {
      state.actualBoard = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBoards, setActualBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
