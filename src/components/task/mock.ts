import { TTasks } from '@/src/types';

export const mockTask: TTasks[] = [
  {
    boardConnect: '1234',
    description: 'test',
    id: '123',
    status: 'pending',
    subTasks: [
      {
        concluded: false,
        text: 'amigo',
        uuid: '123',
      },
    ],
    text: 'test 1',
  },
  {
    boardConnect: '12345',
    description: 'test',
    id: '1234',
    status: 'pending',
    subTasks: [
      {
        concluded: true,
        text: 'amigo',
        uuid: '123',
      },
      {
        concluded: false,
        text: 'amigo',
        uuid: '123',
      },
    ],
    text: 'test 2',
  },
];
