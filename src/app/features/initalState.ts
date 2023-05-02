import { TBoard, TBoardWithTasks, TTasks } from '@/src/types';

interface IInitialState {
  allBoards: TBoard[];
  actualBoard: TBoard;
  actualBoardWithTasks: TBoardWithTasks;
  actualTask: TTasks;
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
  actualTask: {
    boardConnect: '',
    text: '',
    description: '',
    id: '',
    status: 'concluded',
    subTasks: [],
  },
};
