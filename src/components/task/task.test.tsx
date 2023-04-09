import { screen } from '@testing-library/react';
import { Task } from '.';
import { renderTheme } from '../../utils/render-theme';
import { mockTask } from './mock';

describe('<Task />', () => {
  it('should a render task component', () => {
    renderTheme(<Task tasks={mockTask} />);

    const task = screen.getAllByLabelText('Task');

    expect(task);
  });

  it('should redefine two tasks', () => {
    renderTheme(<Task tasks={mockTask} />);

    const task = screen.getAllByLabelText('Task');

    expect(task.length).toBe(mockTask.length);
  });
});
