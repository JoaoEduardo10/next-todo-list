import { TBoard } from '@/src/types';

interface IInitialState {
  allBoards: TBoard[];
  actualBoard: TBoard;
}

export const initialState: IInitialState = {
  allBoards: [],
  actualBoard: {
    boardName: '',
    id: '',
    taskConnect: '',
    userId: '',
  },
};
