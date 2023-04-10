import { screen } from '@testing-library/react';
import { StatusConteiner } from '.';
import { renderTheme } from '../../utils/render-theme';
import { mockTask } from '../task/mock';

describe('<StatusConteiner />', () => {
  it('should a render statusConteiner component', () => {
    renderTheme(<StatusConteiner heading="concluded" tasks={mockTask} />);

    const statusConteiner = screen.getByLabelText('Conteiners Tasks');

    expect(statusConteiner).toBeInTheDocument();
  });

  it('should show the header with the task status and how many tasks exist with the status concluded', () => {
    renderTheme(<StatusConteiner heading="concluded" tasks={mockTask} />);

    const heading = screen.getByLabelText('Status');
    const tasks = screen.getAllByLabelText('Task');

    expect(heading).toHaveTextContent(/concluded/g);
    expect(heading).toHaveTextContent(`concluded (${tasks.length})`);
  });

  it('should show the header with the task status and how many tasks exist with the status pending', () => {
    renderTheme(<StatusConteiner heading="pending" tasks={mockTask} />);

    const heading = screen.getByLabelText('Status');
    const tasks = screen.getAllByLabelText('Task');

    expect(heading).toHaveTextContent(/pending/g);
    expect(heading).toHaveTextContent(`pending (${tasks.length})`);
  });

  it('should show the header with the task status and how many tasks exist with the status progress', () => {
    renderTheme(<StatusConteiner heading="progress" tasks={mockTask} />);

    const heading = screen.getByLabelText('Status');
    const tasks = screen.getAllByLabelText('Task');

    expect(heading).toHaveTextContent(/progress/g);
    expect(heading).toHaveTextContent(`progress (${tasks.length})`);
  });
  it('should not render any tasks', () => {
    renderTheme(<StatusConteiner heading="progress" />);

    const heading = screen.getByLabelText('Status');
    const tasks = screen.queryAllByLabelText('Task');

    expect(heading).toHaveTextContent(/progress/g);
    expect(tasks).toEqual([]);
  });
});
