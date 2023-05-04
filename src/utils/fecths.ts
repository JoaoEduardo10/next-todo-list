import { TBoard, TBoardWithTasks, TSubTasks, TTasks } from '../types';

export type TDataProps = {
  email: string;
  password: string;
};
interface IUser {
  name: string;
  email: string;
  password: string;
}
const urlApi = process.env.NEXT_PUBLIC_URL_API as string;

const loginUser = async (data: TDataProps) => {
  const response = await fetch(`${urlApi}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const token = await response.json();

  return token;
};

const createUser = async (user: IUser) => {
  const { email, name, password } = user;

  const response = await fetch(`${urlApi}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

  return {
    ok: response.ok,
  };
};

const getAllBoards = async (token: string) => {
  const response = await fetch(`${urlApi}/boards`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const data: TBoard[] = await response.json();

  return data;
};

const getBoard = async (token: string, id: string) => {
  const response = await fetch(`${urlApi}/boards/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const data: TBoard[] = await response.json();

  return data;
};

const getBoardWithTasks = async (token: string, id: string) => {
  const response = await fetch(`${urlApi}/boards/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const data: TBoardWithTasks = await response.json();

  return data;
};

const board = async (token: string, boardName: string) => {
  const response = await fetch(`${urlApi}/boards`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ boardName }),
  });

  const data: TBoard = await response.json();

  return data;
};

const deleteBoard = async (token: string, boardId: string) => {
  const response = await fetch(`${urlApi}/boards/${boardId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const data: TBoard = await response.json();

  return data;
};

const updateBoard = async (
  token: string,
  boardId: string,
  boardName: string,
) => {
  const response = await fetch(`${urlApi}/boards/${boardId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ boardName }),
  });

  const data: TBoard = await response.json();

  return data;
};

const createTask = async (token: string, tasks: TTasks) => {
  const response = await fetch(`${urlApi}/tasks`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...tasks }),
  });

  const data: TTasks = await response.json();

  return data;
};

const updateSubTask = async (
  token: string,
  subTask: TSubTasks[],
  taskId: string,
) => {
  const response = await fetch(`${urlApi}/tasks/${taskId}/subtask`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([...subTask]),
  });

  const data: TTasks = await response.json();

  return data;
};

const updateStatus = async (
  token: string,
  status: 'pending' | 'progress' | 'concluded',
  taskId: string,
) => {
  const response = await fetch(`${urlApi}/tasks/${taskId}/status`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data: TTasks = await response.json();

  return data;
};

export {
  loginUser,
  createUser,
  getAllBoards,
  getBoard,
  getBoardWithTasks,
  board,
  deleteBoard,
  updateBoard,
  createTask,
  updateSubTask,
  updateStatus,
};
