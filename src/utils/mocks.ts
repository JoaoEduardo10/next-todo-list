import configureStore from 'redux-mock-store';
import { TBoard } from '../types';

const mockStore = configureStore([]);

const mockBoards: TBoard[] = [
  { id: 'board1', boardName: 'Board 1', taskConnect: '123', userId: '2' },
  { id: 'board2', boardName: 'Board 2', taskConnect: '1234', userId: '2' },
];

const store = mockStore({
  boards: [
    { id: 'board1', boardName: 'Board 1' },
    { id: 'board2', boardName: 'Board 2' },
  ],
});

export { store, mockBoards };
