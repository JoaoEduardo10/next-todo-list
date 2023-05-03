import { screen } from '@testing-library/react';
import { Task } from '.';
import { renderTheme } from '../../utils/render-theme';
import { mockTask } from './mock';
import { store } from '../../utils/mocks';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react');

describe('<Task />', () => {
  const useSessionMock = useSession as jest.MockedFunction<typeof useSession>;

  beforeEach(() => {
    jest.clearAllMocks();

    useSessionMock.mockReturnValue({
      data: [{ user: 'test' }],
      status: 'authenticated',
    } as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
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
