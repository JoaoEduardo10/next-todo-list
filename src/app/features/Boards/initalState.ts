import { TBoard, TTasks } from '@/src/types';

export type TBoardWithTasks = {
  boardName: string;
  id: string | number;
  taskConnect: string;
  userId: string | number;
  tasks: TTasks[];
};

interface IInitialState {
  allBoards: TBoard[];
  actualBoardWithTask: TBoardWithTasks;
}

export const initialState: IInitialState = {
  actualBoardWithTask: {
    boardName: '',
    id: '',
    taskConnect: '',
    tasks: [],
    userId: '',
  },
  allBoards: [],
};
