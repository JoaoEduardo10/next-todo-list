import { TBoard, TBoardWithTasks } from '@/src/types';

interface IInitialState {
  allBoards: TBoard[];
  actualBoard: TBoard;
  actualBoardWithTasks: TBoardWithTasks;
}

export const initialState: IInitialState = {
  allBoards: [],
  actualBoard: {
    boardName: '',
    id: '',
    taskConnect: '',
    userId: '',
  },
  actualBoardWithTasks: {
    boardName: '',
    id: '',
    taskConnect: '',
    tasks: [],
    userId: '',
  },
};
