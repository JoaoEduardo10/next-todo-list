import { act, fireEvent, screen } from '@testing-library/react';
import { SubTasksModal } from '.';
import { renderTheme } from '../../utils/render-theme';
import { mockSubTask } from './mock';
import { useSession } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';
import { store } from '../../utils/mocks';

jest.mock('next-auth/react');

describe('<SubTasksModal />', () => {
  const useSessionMock = useSession as jest.MockedFunction<typeof useSession>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    fetchMock.enableMocks();

    useSessionMock.mockReturnValue({
      data: [{ user: 'test1' }],
      status: 'authenticated',
    } as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.resetMocks();
  });

  it('should render a SubTasksModal', () => {
    renderTheme(<SubTasksModal subTasks={mockSubTask} />, store);

    const heading = screen.getByRole('heading', { name: /SubTasks/i });
    const checkBoxs = screen.getAllByRole('listbox');

    expect(heading).toBeInTheDocument();
    expect(checkBoxs.length).toEqual(3);
  });

  it('should mark the subTask as completed when clicked and unmarked when clicked again', async () => {
    fetchMock.mockReturnValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    renderTheme(<SubTasksModal subTasks={mockSubTask} />, store);

    const heading = screen.getByRole('heading', { name: /SubTasks/i });
    const checkBoxs = screen.getAllByRole('listbox');
    const labels = screen.getAllByLabelText('SubtaskName');

    expect(heading).toBeInTheDocument();
    expect(checkBoxs.length).toEqual(3);

    fireEvent.click(checkBoxs[0].firstChild as ChildNode);

    expect(labels[0]).toHaveStyle({
      'text-decoration': 'line-through',
    });

    await jest.runOnlyPendingTimersAsync();

    fireEvent.click(checkBoxs[0].firstChild as ChildNode);

    expect(labels[0]).toHaveStyle({
      'text-decoration': 'none',
    });
  });
});
