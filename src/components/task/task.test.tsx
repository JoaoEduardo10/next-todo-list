import { screen } from '@testing-library/react';
import { Task } from '.';
import { renderTheme } from '../../utils/render-theme';
import { mockTask } from './mock';
import { store } from '../../utils/mocks';
import { useSession } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';

jest.mock('next-auth/react');

describe('<Task />', () => {
  const useSessionMock = useSession as jest.MockedFunction<typeof useSession>;

  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.enableMocks();

    useSessionMock.mockReturnValue({
      data: [{ user: 'test' }],
      status: 'authenticated',
    } as any);

    fetchMock.mockReturnValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.resetMocks();
  });

  it('should a render task component', () => {
    renderTheme(<Task tasks={mockTask} />, store);

    const task = screen.getAllByLabelText('Task');

    expect(task);
  });

  it('should redefine two tasks', () => {
    renderTheme(<Task tasks={mockTask} />, store);

    const task = screen.getAllByLabelText('Task');

    expect(task.length).toBe(mockTask.length);
  });
});
