import { fireEvent, screen } from '@testing-library/react';
import { SubTasksInputs } from '.';
import { renderTheme } from '../../utils/render-theme';

const actualSubTaskMock = [
  {
    text: 'test1',
  },
  {
    text: 'test2',
  },
];
describe('<SubTasksInputs />', () => {
  const setSybTasks = jest.fn();

  it('should render a SubTasksInputs', () => {
    renderTheme(
      <SubTasksInputs clearInput={false} setSubTasks={setSybTasks} />,
    );

    const conteiner = screen.getByRole('listbox');
    const conteinerList = screen.getByRole('list');
    const inputs = screen.getByRole('listitem');
    const button = screen.getByRole('button', {
      name: 'Adicionar Nova SubTarefa',
    });

    expect(conteiner).toBeInTheDocument();
    expect(conteinerList).toBeInTheDocument();
    expect(inputs).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should add a new input', () => {
    renderTheme(
      <SubTasksInputs clearInput={false} setSubTasks={setSybTasks} />,
    );

    const inputs = screen.getAllByPlaceholderText('Nome da tarefa');
    const button = screen.getByRole('button', {
      name: 'Adicionar Nova SubTarefa',
    });

    expect(inputs.length).toEqual(1);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getAllByPlaceholderText('Nome da tarefa').length).toEqual(2);
  });

  it('should delete an input', () => {
    renderTheme(
      <SubTasksInputs clearInput={false} setSubTasks={setSybTasks} />,
    );

    const button = screen.getByRole('button', {
      name: 'Adicionar Nova SubTarefa',
    });

    fireEvent.click(button);

    const inputs = screen.getAllByPlaceholderText('Nome da tarefa');
    const deleteInput = screen.getAllByLabelText('Delete SubTarefa');

    expect(inputs.length).toEqual(2);
    expect(deleteInput.length).toEqual(2);

    fireEvent.click(deleteInput[0]);

    expect(screen.getAllByLabelText('Delete SubTarefa').length).toEqual(1);
  });

  it('should get value from the inputs', () => {
    renderTheme(
      <SubTasksInputs clearInput={false} setSubTasks={setSybTasks} />,
    );

    const button = screen.getByRole('button', {
      name: 'Adicionar Nova SubTarefa',
    });

    fireEvent.click(button);

    const inputs: any = screen.getAllByPlaceholderText('Nome da tarefa');

    fireEvent.change(inputs[0], { target: { value: 'test1' } });
    fireEvent.change(inputs[1], { target: { value: 'test2' } });

    expect(inputs[0].value).toEqual('test1');
    expect(inputs[1].value).toEqual('test2');
  });

  it('should reset all inputs', () => {
    renderTheme(<SubTasksInputs clearInput={true} setSubTasks={setSybTasks} />);

    const button = screen.getByRole('button', {
      name: 'Adicionar Nova SubTarefa',
    });

    fireEvent.click(button);

    const inputs: any = screen.getAllByPlaceholderText('Nome da tarefa');

    expect(inputs[0].value).toEqual('');
    expect(inputs[1].value).toEqual('');
  });

  it('should return the inputls already prenexed', () => {
    renderTheme(
      <SubTasksInputs
        clearInput={false}
        actualSubTasks={actualSubTaskMock}
        setSubTasks={setSybTasks}
      />,
    );

    const inputs: any[] = screen.getAllByPlaceholderText('Nome da tarefa');

    expect(inputs.length).toBe(2);

    expect(inputs[0].value).toEqual('test1');
    expect(inputs[1].value).toEqual('test2');
  });
});
