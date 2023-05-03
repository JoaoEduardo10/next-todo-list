import { TTasks } from '@/src/types';

interface IInitialState {
  actualTask: TTasks;
}

export const initialState: IInitialState = {
  actualTask: {
    boardConnect: '',
    text: '',
    _id: '',
    description: '',
    id: '',
    status: 'pending',
    subTasks: [],
  },
};
