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
    status: 'concluded',
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
  {
    boardConnect: '123452',
    description: 'test',
    id: '12342',
    status: 'concluded',
    subTasks: [
      {
        concluded: true,
        text: 'amigo',
        uuid: '1232',
      },
      {
        concluded: false,
        text: 'amigo',
        uuid: '1232',
      },
    ],
    text: 'test 7',
  },
  {
    boardConnect: '123456',
    description: 'test',
    id: '12345',
    status: 'progress',
    subTasks: [
      {
        concluded: true,
        text: 'amigo',
        uuid: '1234',
      },
      {
        concluded: false,
        text: 'amigo',
        uuid: '1234',
      },
    ],
    text: 'test 3',
  },
];
