import '@testing-library/jest-dom';
import 'jest-styled-components';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { TBoard } from '../src/types';

export const mockResponse: TBoard[] = [
  {
    boardName: 'test1',
    id: '123',
    taskConnect: '123',
    userId: '123',
  },
  {
    boardName: 'test2',
    id: '1234',
    taskConnect: '1234',
    userId: '1234',
  },
];

export const server = setupServer(
  rest.get('/api-de-test/boards', (req, res, ctx) => {
    return res(ctx.json(mockResponse));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
