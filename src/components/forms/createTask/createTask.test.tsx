import { store } from '../../../utils/mocks';
import { CreateTasks } from '.';
import { renderTheme } from '../../../utils/render-theme';
import { act, fireEvent, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';

jest.mock('next-auth/react');

describe('<CreateTasks />', () => {
  const useSessionMock = useSession as jest.MockedFunction<typeof useSession>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    fetchMock.enableMocks();

    useSessionMock.mockReturnValue({
      data: [{ user: 'test' }],
      status: 'authenticated',
    } as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.resetMocks();
  });

  const setShowCreateTask = jest.fn();

  it('should a render createTask component', () => {
    renderTheme(
      <CreateTasks
        rendering={true}
        show={true}
        setShowCreateTask={setShowCreateTask}
      />,
      store,
    );

    const conteiner = screen.getByLabelText('CreateTask Form/Conteiner');
    const form = screen.getByRole('form');
    const conteinerInput = screen.getAllByLabelText('ConteinerInput');
    const button = screen.getByRole('button', { name: 'Criar tarefa' });
    const textInput = screen.getByPlaceholderText(
      'Por exemplo: faça uma pausa para café',
    );
    const textArea = screen.getByLabelText('Text Area');

    expect(conteiner).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(conteinerInput.length).toEqual(3);
    expect(button).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();
  });

  it('should show the error message for not sending the valueTaskName', () => {
    renderTheme(
      <CreateTasks
        rendering={true}
        show={true}
        setShowCreateTask={setShowCreateTask}
      />,
      store,
    );

    const button = screen.getByRole('button', { name: 'Criar tarefa' });
    const messageError = screen.getByLabelText('Message Error');

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(messageError).toHaveTextContent('Adicione um nome a tasks');

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(messageError).toHaveTextContent('');
  });

  it('should show the error message for sending valueTaskName < 3', () => {
    renderTheme(
      <CreateTasks
        rendering={true}
        show={true}
        setShowCreateTask={setShowCreateTask}
      />,
      store,
    );

    const button = screen.getByRole('button', { name: 'Criar tarefa' });
    const messageError = screen.getByLabelText('Message Error');
    const textInput = screen.getByPlaceholderText(
      'Por exemplo: faça uma pausa para café',
    );

    expect(button).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: 'te' } });

    fireEvent.click(button);

    expect(messageError).toHaveTextContent(
      'Adicione um nome a tasks com no minimo 3 caracteres',
    );

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(messageError).toHaveTextContent('');
  });

  it('should show the error message for sending valueDescription< 6', () => {
    renderTheme(
      <CreateTasks
        rendering={true}
        show={true}
        setShowCreateTask={setShowCreateTask}
      />,
      store,
    );

    const button = screen.getByRole('button', { name: 'Criar tarefa' });
    const messageError = screen.getByLabelText('Message Error');
    const textInput = screen.getByPlaceholderText(
      'Por exemplo: faça uma pausa para café',
    );
    const textArea = screen.getByLabelText('Text Area');

    expect(button).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: 'test' } });
    fireEvent.change(textArea, { target: { value: 'test' } });

    fireEvent.click(button);

    expect(messageError).toHaveTextContent(
      'adicione no minimo 6 letras a descrição',
    );

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(messageError).toHaveTextContent('');
  });

  it('should show an error message for not adding any subtasks', () => {
    renderTheme(
      <CreateTasks
        rendering={true}
        show={true}
        setShowCreateTask={setShowCreateTask}
      />,
      store,
    );

    const button = screen.getByRole('button', { name: 'Criar tarefa' });
    const messageError = screen.getByLabelText('Message Error');
    const textInput = screen.getByPlaceholderText(
      'Por exemplo: faça uma pausa para café',
    );
    const deleteSubTarefa = screen.getAllByLabelText('Delete SubTarefa');

    expect(button).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: 'test' } });
    fireEvent.click(deleteSubTarefa[0]);
    fireEvent.click(button);

    expect(messageError).toHaveTextContent('adicione no minimo 1 subTarefa');

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(messageError).toHaveTextContent('');
  });

  it('should return an error for not adding im text to the subtask', () => {
    renderTheme(
      <CreateTasks
        rendering={true}
        show={true}
        setShowCreateTask={setShowCreateTask}
      />,
      store,
    );

    const button = screen.getByRole('button', { name: 'Criar tarefa' });
    const messageError = screen.getByLabelText('Message Error');
    const textInput = screen.getByPlaceholderText(
      'Por exemplo: faça uma pausa para café',
    );
    const subTasksInputs = screen.getAllByPlaceholderText('Nome da tarefa');

    expect(button).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: 'test' } });
    fireEvent.change(subTasksInputs[0], { target: { value: '' } });

    fireEvent.click(button);

    expect(messageError).toHaveTextContent(`adicone um text a subTarefa 1`);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(messageError).toHaveTextContent('');
  });

  it('should create a task', () => {
    fetchMock.mockReturnValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    renderTheme(
      <CreateTasks
        rendering={true}
        show={true}
        setShowCreateTask={setShowCreateTask}
      />,
      store,
    );

    const button = screen.getByRole('button', { name: 'Criar tarefa' });
    const textInput = screen.getByPlaceholderText(
      'Por exemplo: faça uma pausa para café',
    );
    const subTasksInputs = screen.getAllByPlaceholderText('Nome da tarefa');

    expect(button).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: 'test' } });
    fireEvent.change(subTasksInputs[0], {
      target: { value: 'test concluido' },
    });

    fireEvent.click(button);
  });

  it('should a render createTask component', () => {
    renderTheme(
      <CreateTasks
        rendering={true}
        show={true}
        setShowCreateTask={setShowCreateTask}
      />,
      store,
    );

    const closeCreateTask = screen.getByLabelText('Close CreateTask');

    expect(closeCreateTask).toBeInTheDocument();

    fireEvent.click(closeCreateTask);

    expect(setShowCreateTask).toHaveBeenCalledWith(false);
  });

  it('should not render a createtask component', () => {
    renderTheme(
      <CreateTasks
        rendering={true}
        show={false}
        setShowCreateTask={setShowCreateTask}
      />,
      store,
    );

    const conteiner = screen.getByLabelText('CreateTask Form/Conteiner');

    expect(conteiner).toHaveStyle({
      opacity: '0',
    });
  });
});
