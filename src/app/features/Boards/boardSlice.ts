import { TBoard, TBoardWithTasks, TTasks } from '@/src/types';
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
    deleteBoard: (state, action: PayloadAction<{ id: string }>) => {
      const idToRemove = action.payload.id;

      const indexArreyRemove = state.allBoards.findIndex(
        (board) => board.id == idToRemove,
      );

      if (indexArreyRemove !== -1) {
        state.allBoards.splice(indexArreyRemove, 1);
      }
    },
    setActualBoard: (state, action: PayloadAction<TBoard>) => {
      state.actualBoard = action.payload;
    },
    setActualBoardWithTasks: (
      state,
      action: PayloadAction<TBoardWithTasks>,
    ) => {
      state.actualBoardWithTasks = action.payload;
    },
    postNewTasksInBoard: (state, action: PayloadAction<TTasks>) => {
      state.actualBoardWithTasks.tasks.push(action.payload);
    },
  },
});

export const {
  setBoards,
  setActualBoard,
  setActualBoardWithTasks,
  postNewTasksInBoard,
  deleteBoard,
} = boardsSlice.actions;
export default boardsSlice.reducer;
