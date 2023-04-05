import React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { MenuElipsis } from '.';
import { renderTheme } from '../../../utils/render-theme';
import configureStore from 'redux-mock-store';
import { useRouter } from 'next/router';

const mockStore = configureStore([]);

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock do useSession
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

const nextAuthReactMocked = useSession as jest.MockedFunction<
  typeof useSession
>;

describe('MenuElipsis', () => {
  let stori: any;
  const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;

  beforeEach(() => {
    jest.useFakeTimers();

    stori = mockStore({
      boards: [
        { id: 'board1', boardName: 'Board 1' },
        { id: 'board2', boardName: 'Board 2' },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a MenuElipsis', () => {
    nextAuthReactMocked.mockReturnValueOnce({
      data: [{ user: { name: 'test' } }, false],
      status: 'authenticated',
    } as any);

    renderTheme(<MenuElipsis show={true} setMenuElipsis={jest.fn()} />, stori);

    const menuElipsis = screen.getByLabelText('MenuElipsis');

    expect(menuElipsis).toBeVisible();

    jest.advanceTimersByTime(1000);
  });

  it('should redirect to login page if no session', () => {
    nextAuthReactMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    useRouterMock.mockReturnValue({
      push: jest.fn(),
      route: '/login',
      asPath: '/login',
    } as any);

    // Renderiza o componente
    renderTheme(<MenuElipsis show={true} setMenuElipsis={jest.fn()} />, stori);

    // Verifica se o usuário foi redirecionado para a página inicial
    expect(useRouter).toHaveBeenCalled();
    expect(useRouter().push).toHaveBeenCalledWith('/login');
  });

  it('should call signOut function on button click', () => {
    nextAuthReactMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    useRouterMock.mockReturnValue({
      push: jest.fn(),
      route: '/login',
      asPath: '/login',
    } as any);

    renderTheme(<MenuElipsis show={true} setMenuElipsis={jest.fn()} />, stori);

    const button = screen.getByLabelText('Conteiner Button').firstChild;

    fireEvent.click(button as ChildNode);

    expect(useRouter().push).toHaveBeenCalledWith('/login');
  });

  it('should hide menu when clicking edit frame', () => {
    const functionSetMenuElipsis = jest.fn();
    nextAuthReactMocked.mockReturnValueOnce({
      data: [{ user: { name: 'test' } }, false],
      status: 'authenticated',
    } as any);

    renderTheme(
      <MenuElipsis show={true} setMenuElipsis={functionSetMenuElipsis} />,
      stori,
    );

    const editBoard = screen.getByLabelText('Editar Quadro');

    expect(editBoard).toBeInTheDocument();
    fireEvent.click(editBoard);

    expect(functionSetMenuElipsis).toHaveBeenCalledWith(false);
  });

  it('should hide menu when clicking delete frame', () => {
    const functionSetMenuElipsis = jest.fn();
    nextAuthReactMocked.mockReturnValueOnce({
      data: [{ user: { name: 'test' } }, false],
      status: 'authenticated',
    } as any);

    renderTheme(
      <MenuElipsis show={true} setMenuElipsis={functionSetMenuElipsis} />,
      stori,
    );

    const deleteBoard = screen.getByLabelText('Deletar Quadro');

    expect(deleteBoard).toBeInTheDocument();
    fireEvent.click(deleteBoard);

    expect(functionSetMenuElipsis).toHaveBeenCalledWith(false);
  });

  it('should hide the menu', async () => {
    const functionSetMenuElipsis = jest.fn();
    nextAuthReactMocked.mockReturnValueOnce({
      data: [{ user: { name: 'test' } }],
      status: 'authenticated',
    } as any);

    await act(async () =>
      renderTheme(
        <MenuElipsis show={false} setMenuElipsis={functionSetMenuElipsis} />,
        stori,
      ),
    );

    jest.advanceTimersByTime(1000);
  });
});
