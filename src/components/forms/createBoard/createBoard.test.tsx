import { act, fireEvent, screen } from '@testing-library/react';
import { CreateBoard } from '.';
import { renderTheme } from '../../../utils/render-theme';
import fetchMock from 'jest-fetch-mock';
import { useSession } from 'next-auth/react';
import { store } from '../../../utils/mocks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { TBoard } from '@/src/types';

jest.mock('next-auth/react');

describe('<CreateBoard />', () => {
  const fn = jest.fn();
  const nextAuthUseSessionMock = useSession as jest.MockedFunction<
    typeof useSession
  >;

  beforeEach(() => {
    jest.useFakeTimers();
    fetchMock.enableMocks();

    nextAuthUseSessionMock.mockReturnValue({
      data: [{ user: 'test' }],
      status: 'authenticated',
    } as any);
  });

  afterEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it('should a render CreateBoard component with Childrens', () => {
    renderTheme(
      <CreateBoard
        buttonName="Criar Board"
        rendering={true}
        setShow={fn}
        show={true}
        text="Crie Uma board"
      />,
      store,
    );

    const conteinerCreateBoard = screen.getByLabelText('Criação de Quadro');
    const form = screen.getByLabelText('Form');
    const closeCreateBoard = screen.getByLabelText('Close Board');
    const heading = screen.getByLabelText('Cabeçalho');
    const input = screen.getByPlaceholderText('Nome do Quadro');
    const button = screen.getByRole('button', { name: 'Criar Board' });

    expect(conteinerCreateBoard).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(closeCreateBoard).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should trigger the error message for not typing a board name', () => {
    renderTheme(
      <CreateBoard
        buttonName="Criar Board"
        rendering={true}
        setShow={fn}
        show={true}
        text="Crie Uma board"
      />,
      store,
    );

    const button = screen.getByRole('button', { name: 'Criar Board' });

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    fireEvent.click(button);

    const messageError = screen.getByLabelText('Message');

    expect(messageError).toHaveTextContent('Adione um Nome Para o Quadro');
  });

  it('should successfully create a board', async () => {
    const showMock = jest.fn();

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    await act(async () =>
      renderTheme(
        <CreateBoard
          buttonName="Criar Board"
          rendering={true}
          setShow={showMock}
          show={true}
          text="Crie Uma board"
        />,
        store,
      ),
    );

    const form = screen.getByLabelText('Form');
    const input = screen.getByPlaceholderText('Nome do Quadro');

    fireEvent.change(input, { target: { value: 'test' } });

    fireEvent.submit(form);
  });

  it('should close create a board', async () => {
    const showMock = jest.fn();

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    await act(async () =>
      renderTheme(
        <CreateBoard
          buttonName="Criar Board"
          rendering={true}
          setShow={showMock}
          show={true}
          text="Crie Uma board"
        />,
        store,
      ),
    );

    const closeBoard = screen.getByLabelText('Close Board');

    expect(closeBoard).toBeInTheDocument();

    fireEvent.click(closeBoard);

    expect(showMock).toHaveBeenCalledWith(false);
  });
});
