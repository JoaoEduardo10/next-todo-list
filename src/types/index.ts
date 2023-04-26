export type TSubTasks = {
  text: string;
  concluded?: boolean;
  uuid?: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TTasks = {
  id?: string;
  text: string;
  description?: string;
  subTasks?: TSubTasks[];
  status?: 'pending' | 'progress' | 'concluded';
  boardConnect: string;
};

export type TBoard = {
  id: string;
  boardName: string;
  taskConnect: string;
  userId: string;
};

export type TBoardWithTasks = {
  boardName: string;
  id: string | number;
  taskConnect: string;
  userId: string;
  tasks: TTasks[];
};
