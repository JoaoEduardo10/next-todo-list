import { store } from '../../../utils/mocks';
import { MenuElipsis } from '.';
import { renderTheme } from '../../../utils/render-theme';
import { useSession, signOut } from 'next-auth/react';
import { act, fireEvent, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

jest.mock('next-auth/react');

describe('<MenuElipsis />', () => {
  const setMenuElipisis = jest.fn();
  const useSessionMock = useSession as jest.MockedFunction<typeof useSession>;
  const signOutMock = signOut as jest.MockedFunction<typeof signOut>;

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

  it('should render a MenuElipisi Component', () => {
    renderTheme(
      <MenuElipsis setMenuElipsis={setMenuElipisis} show={true} />,
      store,
    );

    const menuElipsis = screen.getByLabelText('MenuElipsis');
    const conteinerDelete = screen.getByLabelText('conteinerDelete');
    const buttonEdit = screen.getByLabelText('Editar Quadro');
    const buttonDelete = screen.getByLabelText('Deletar Quadro');
    const buttonSignOut = screen.getByRole('button', { name: 'Sair' });

    expect(menuElipsis).toBeInTheDocument();
    expect(conteinerDelete).toHaveStyle({
      opacity: '0',
    });
    expect(buttonDelete).toBeInTheDocument();
    expect(buttonEdit).toBeInTheDocument();
    expect(buttonSignOut).toBeInTheDocument();
  });

  it('should show the CreateBoard for the board on click', () => {
    renderTheme(
      <MenuElipsis setMenuElipsis={setMenuElipisis} show={true} />,
      store,
    );

    const buttonEdit = screen.getByLabelText('Editar Quadro');

    expect(buttonEdit).toBeInTheDocument();

    fireEvent.click(buttonEdit);
  });

  it('should show the containerDelete for the board on click', () => {
    renderTheme(
      <MenuElipsis setMenuElipsis={setMenuElipisis} show={true} />,
      store,
    );

    const conteinerDelete = screen.getByLabelText('conteinerDelete');
    const buttonDelete = screen.getByLabelText('Deletar Quadro');

    expect(conteinerDelete).toHaveStyle({
      opacity: '0',
    });
    expect(buttonDelete).toBeInTheDocument();

    fireEvent.click(buttonDelete);

    expect(conteinerDelete).toHaveStyle({
      opacity: '1',
    });
  });

  it('should delete a board', () => {
    fetchMock.mockReturnValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    renderTheme(
      <MenuElipsis setMenuElipsis={setMenuElipisis} show={true} />,
      store,
    );

    const buttonDelete = screen.getByLabelText('Deletar Quadro');

    expect(buttonDelete).toBeInTheDocument();

    fireEvent.click(buttonDelete);

    const button = screen.getByRole('button', { name: 'Excluir' });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);
  });

  it('should cancel delete a board', () => {
    fetchMock.mockReturnValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    renderTheme(
      <MenuElipsis setMenuElipsis={setMenuElipisis} show={true} />,
      store,
    );

    const buttonDelete = screen.getByLabelText('Deletar Quadro');
    const conteinerDelete = screen.getByLabelText('conteinerDelete');

    expect(buttonDelete).toBeInTheDocument();

    fireEvent.click(buttonDelete);

    const button = screen.getByRole('button', { name: 'Cancelar' });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(conteinerDelete).toHaveStyle({
      opacity: '0',
    });
  });

  it('should signOut user', () => {
    signOutMock.mockReturnValue({
      redirect: true,
    } as any);

    fetchMock.mockReturnValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    renderTheme(
      <MenuElipsis setMenuElipsis={setMenuElipisis} show={true} />,
      store,
    );

    const button = screen.getByRole('button', { name: 'Sair' });

    fireEvent.click(button);
  });

  it('should not render a MenuElipisi Component', () => {
    renderTheme(
      <MenuElipsis setMenuElipsis={setMenuElipisis} show={false} />,
      store,
    );

    const menuElipsis = screen.getByLabelText('MenuElipsis');

    expect(menuElipsis).toBeInTheDocument();

    expect(menuElipsis).toHaveStyle({
      opacity: '0',
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });
  });
});
