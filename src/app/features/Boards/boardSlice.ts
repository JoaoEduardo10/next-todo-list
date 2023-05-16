import { TBoard, TBoardWithTasks, TTasks } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initalState';

type TStatus = 'pending' | 'progress' | 'concluded';

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
    updateBoard: (
      state,
      action: PayloadAction<{ id: string; boardName: string }>,
    ) => {
      const idToRemove = action.payload.id;

      const indexArreyRemove = state.allBoards.findIndex(
        (board) => board.id == idToRemove,
      );

      if (indexArreyRemove !== -1) {
        state.allBoards.map((board) => {
          if (board.id == idToRemove) {
            board.boardName = action.payload.boardName;
          }
        });
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
    setTasksInBoard: (state, action: PayloadAction<TTasks>) => {
      state.actualBoardWithTasks.tasks.push(action.payload);
    },
    postNewTasksInBoard: (state, action: PayloadAction<TTasks>) => {
      state.actualBoardWithTasks.tasks.push(action.payload);
    },
    setNewSubTaskConcluded: (
      state,
      action: PayloadAction<{ uuid: string; concluded: boolean; task: TTasks }>,
    ) => {
      const { uuid, concluded, task: actionTask } = action.payload;

      const { tasks } = state.actualBoardWithTasks;

      if (tasks && tasks.length <= 0) {
        return;
      }

      const index = tasks.findIndex((task) => task._id == actionTask._id);

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

      state.actualBoardWithTasks.tasks = [...updatedTasks];
    },
    setNewStatus: (
      state,
      action: PayloadAction<{ status: TStatus; task: TTasks }>,
    ) => {
      const { status, task: actionTask } = action.payload;

      const { tasks } = state.actualBoardWithTasks;

      if (tasks && tasks.length <= 0) {
        return;
      }

      const index = tasks.findIndex((task) => task._id == actionTask._id);

      const actualTask = tasks[index];

      if (!actualTask) return;

      const updatedSubTasks = (actualTask.status = status);

      const updatedTask = { ...actualTask, status: updatedSubTasks };
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1, updatedTask);

      state.actualBoardWithTasks.tasks = [...updatedTasks];
    },
    setNewTask: (
      state,
      action: PayloadAction<{ actionTask: TTasks; newTask: TTasks }>,
    ) => {
      const { actionTask, newTask } = action.payload;

      const { tasks } = state.actualBoardWithTasks;

      if (tasks && tasks.length <= 0) {
        return;
      }

      const index = tasks?.findIndex((task) => task._id == actionTask._id);

      const actualTask = tasks[index];

      if (!actualTask) return;

      const updatedTask = { ...newTask };
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1, updatedTask);

      state.actualBoardWithTasks.tasks = [...updatedTasks];
    },
    removeTask: (state, action: PayloadAction<{ task: TTasks }>) => {
      const { task: actionTask } = action.payload;

      const { tasks } = state.actualBoardWithTasks;

      if (tasks && tasks.length <= 0) {
        return;
      }

      const index = tasks.findIndex((task) => task._id == actionTask._id);

      if (index !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);

        state.actualBoardWithTasks.tasks = [...updatedTasks];
      }
    },
  },
});

export const {
  setBoards,
  setActualBoard,
  setActualBoardWithTasks,
  postNewTasksInBoard,
  deleteBoard,
  updateBoard,
  setTasksInBoard,
  setNewSubTaskConcluded,
  setNewStatus,
  setNewTask,
  removeTask,
} = boardsSlice.actions;
export default boardsSlice.reducer;
