import { store } from '../../../utils/mocks';
import { UpdateBoard } from '.';
import { renderTheme } from '../../../utils/render-theme';
import { act, fireEvent, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';

jest.mock('next-auth/react');

describe('<UpdateBoard />', () => {
  const setShow = jest.fn();

  const useSessionMock = useSession as jest.MockedFunction<typeof useSession>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
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

  it('should render UpdateBoard component', () => {
    renderTheme(
      <UpdateBoard rendering={true} show={true} setShow={setShow} />,
      store,
    );

    const updateBoard = screen.getByLabelText('Update Board');
    const closeUpdateBoardButton = screen.getByLabelText('Close UpdateBoard');
    const heading = screen.getByRole('heading', { name: 'Editar quadro' });
    const input = screen.getByPlaceholderText('Nome do Quadro');
    const saveButton = screen.getByRole('button', { name: 'Salvar Alteração' });
    const form = screen.getByRole('form');

    expect(updateBoard).toBeInTheDocument();
    expect(closeUpdateBoardButton).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it('should show an error for not sending a boardName', () => {
    renderTheme(
      <UpdateBoard rendering={true} show={true} setShow={setShow} />,
      store,
    );

    const input: any = screen.getByPlaceholderText('Nome do Quadro');
    const saveButton = screen.getByRole('button', { name: 'Salvar Alteração' });
    const messageError = screen.getByLabelText('Message Error');

    expect(input).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    expect(messageError).toHaveTextContent('');
    expect(input.value).toEqual('Board 1');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(saveButton);

    expect(messageError).toHaveTextContent('adicione um nome para alterar');
    expect(input.value).toEqual('');

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(messageError).toHaveTextContent('');
  });

  it('should update the boardName', () => {
    renderTheme(
      <UpdateBoard rendering={true} show={true} setShow={setShow} />,
      store,
    );

    const input: any = screen.getByPlaceholderText('Nome do Quadro');
    const saveButton = screen.getByRole('button', { name: 'Salvar Alteração' });
    const messageError = screen.getByLabelText('Message Error');

    expect(input).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    expect(messageError).toHaveTextContent('');
    expect(input.value).toEqual('Board 1');

    fireEvent.change(input, { target: { value: 'Board' } });
    fireEvent.click(saveButton);

    jest.advanceTimersByTime(4000);
  });

  it('should close the updateBoard', () => {
    renderTheme(
      <UpdateBoard rendering={true} show={true} setShow={setShow} />,
      store,
    );

    const closeUpdateBoardButton = screen.getByLabelText('Close UpdateBoard');

    expect(closeUpdateBoardButton).toBeInTheDocument();

    fireEvent.click(closeUpdateBoardButton);
    expect(setShow).toHaveBeenCalledWith(false);
  });
});
