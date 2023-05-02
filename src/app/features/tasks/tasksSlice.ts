import { TBoard, TBoardWithTasks, TTasks } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../initalState';

export const boardsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    actualTask: (state, action: PayloadAction<TTasks>) => {
      state.actualTask = action.payload;
    },
    setNewSubTaskConcluded: (
      state,
      action: PayloadAction<{ uuid: string; concluded: boolean }>,
    ) => {
      const { uuid, concluded } = action.payload;
      const { tasks } = state.actualBoardWithTasks;
      const index = tasks.findIndex((task) => task.id === state.actualTask.id);
      const actualTask = tasks[index];

      if (!actualTask) return;

      const updatedSubTasks = actualTask.subTasks?.map((subTask) => {
        if (subTask.uuid === uuid) {
          return { ...subTask, concluded };
        }
        return subTask;
      });

      const updatedTask = { ...actualTask, subTasks: updatedSubTasks };
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1, updatedTask);

      state.actualBoardWithTasks.tasks = updatedTasks;
    },
  },
});

export const { setNewSubTaskConcluded } = boardsSlice.actions;
export default boardsSlice.reducer;
