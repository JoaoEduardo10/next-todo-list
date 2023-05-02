import { fireEvent, screen } from '@testing-library/react';
import { SubTasksModal } from '.';
import { renderTheme } from '../../utils/render-theme';
import { mockSubTask } from './mock';

describe('<SubTasksModal />', () => {
  it('should render a SubTasksModal', () => {
    renderTheme(<SubTasksModal subTasks={mockSubTask} />);

    const heading = screen.getByRole('heading', { name: 'SubTasks' });
    const checkBoxs = screen.getAllByRole('listbox');

    expect(heading).toBeInTheDocument();
    expect(checkBoxs.length).toEqual(3);
  });

  it('should mark the subTask as completed when clicked and unmarked when clicked again', () => {
    renderTheme(<SubTasksModal subTasks={mockSubTask} />);

    const heading = screen.getByRole('heading', { name: 'SubTasks' });
    const checkBoxs = screen.getAllByRole('listbox');
    const labels = screen.getAllByLabelText('SubtaskName');

    expect(heading).toBeInTheDocument();
    expect(checkBoxs.length).toEqual(3);

    fireEvent.click(checkBoxs[0].firstChild as ChildNode);

    expect(labels[0]).toHaveStyle({
      'text-decoration': 'line-through',
    });

    fireEvent.click(checkBoxs[0].firstChild as ChildNode);

    expect(labels[0]).toHaveStyle({
      'text-decoration': 'none',
    });
  });
});
