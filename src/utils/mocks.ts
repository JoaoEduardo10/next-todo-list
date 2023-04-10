import configureStore from 'redux-mock-store';
import { TBoard } from '../types';
import { mockTask } from '../components/task/mock';

const mockStore = configureStore([]);

const mockBoards: TBoard[] = [
  { id: 'board1', boardName: 'Board 1', taskConnect: '123', userId: '2' },
  { id: 'board2', boardName: 'Board 2', taskConnect: '1234', userId: '2' },
];

const store = mockStore({
  boards: {
    allBoards: [
      { id: 'board1', boardName: 'Board 1' },
      { id: 'board2', boardName: 'Board 2' },
    ],
    actualBoard: { id: 'board1', boardName: 'Board 1' },
    actualBoardWithTasks: {
      boardName: 'Board 1',
      id: '1234',
      taskConnect: '1234',
      tasks: mockTask,
      userId: '1234',
    },
  },
});

export { store, mockBoards };
