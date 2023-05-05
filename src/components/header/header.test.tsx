import { Header } from '.';
import { renderTheme } from '../../utils/render-theme';
import { store } from '../../utils/mocks';
import { fireEvent, screen } from '@testing-library/react';
import 'jest-styled-components';
import configureStore from 'redux-mock-store';
import { useSession } from 'next-auth/react';

const mockStore = configureStore([]);
jest.mock('next-auth/react');

describe('<Header  />', () => {
  const nextUseSessionMock = useSession as jest.MockedFunction<
    typeof useSession
  >;

  beforeEach(() => {
    nextUseSessionMock.mockReturnValue({
      data: [{ user: 'test' }],
      status: 'authenticated',
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a Header componet', () => {
    renderTheme(<Header logo={'test.svg'} />, store);

    const header = screen.getByLabelText('Cabeçalho do site');
    const logoImg = screen.getByRole('img', { name: 'test.svg' });
    const logoName = screen.getByRole('heading', { name: 'kanban' });
    const CurrentBoardName = screen.getByLabelText('Nome do Quadro atual');
    const button = screen.getByRole('button', {
      name: '+ Adicionar uma Tarefa',
    });
    const OpenMenuDropdownModal = screen.getByLabelText(
      'Menu Open/DropdownModal',
    );
    const OpenMenuElipsisHeader = screen.getByLabelText('Open/Elipsis');

    expect(header).toBeInTheDocument();
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('alt', 'test.svg');
    expect(logoName).toBeInTheDocument();
    expect(CurrentBoardName).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(OpenMenuDropdownModal).toHaveStyle({
      display: 'none',
    });
    expect(OpenMenuElipsisHeader).toBeInTheDocument();
  });

  it('should appear MenuElipsisHeader when clicking on bottuno Open and disappear when clicking on bottan close', () => {
    renderTheme(<Header logo={'test.svg'} />, store);

    const menuElipsis = screen.getByLabelText('MenuElipsisHeader');
    const openMenuElipsisHeader = screen.getByLabelText('Open/Elipsis');

    fireEvent.click(openMenuElipsisHeader);

    const closeMenuElipsisHeader = screen.getByLabelText('Close/Elipsis');

    expect(menuElipsis).toHaveStyle({
      animation: 'openShow 300ms ease-in-out',
    });

    expect(closeMenuElipsisHeader).toBeInTheDocument();

    fireEvent.click(closeMenuElipsisHeader);

    expect(menuElipsis).toHaveStyle({
      animation: 'closeShow 0.5s ease-in-out',
    });
  });

  it('should appear the MenuDropdownModal when clicking on bottuno Open and disappear when clicking on bottan close', () => {
    renderTheme(<Header logo={'test.svg'} />, store);

    const openMenuDropdownModal = screen.getByLabelText(
      'Menu Open/DropdownModal',
    );

    fireEvent.click(openMenuDropdownModal);

    const menuDropdownModal = screen.getByLabelText('Menu');
    const closeMenuDropdownModal = screen.getByLabelText(
      'Menu Close/DropdownModal',
    );

    expect(closeMenuDropdownModal).toBeInTheDocument();

    expect(menuDropdownModal).toHaveStyleRule('display', 'flex', {
      media: '(max-width: 780px)',
    });

    fireEvent.click(closeMenuDropdownModal);

    expect(menuDropdownModal).toHaveStyleRule('visibility', 'hidden', {
      media: '(max-width: 780px)',
    });
  });

  it('should return without a current Board', () => {
    const newStore = mockStore({
      boards: {
        allBoards: [],
        actualBoard: { id: '', boardName: '' },
      },
    });

    renderTheme(<Header logo={'test.svg'} />, newStore);

    const heading = screen.getByLabelText('Nome do Quadro atual');

    expect(heading).toHaveTextContent('não ha quadros criados!');
  });
});
