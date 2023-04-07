import { Header } from '.';
import { renderTheme } from '../../utils/render-theme';
import { store } from '../../utils/mocks';
import { fireEvent, screen } from '@testing-library/react';
import 'jest-styled-components';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('<Header  />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a Header componet', () => {
    renderTheme(<Header logo={'test.svg'} />, store);

    const header = screen.getByLabelText('Cabeçalho');
    const logoImg = screen.getByRole('img', { name: 'test.svg' });
    const logoName = screen.getByRole('heading', { name: 'kanban' });
    const CurrentBoardName = screen.getByLabelText('Nome do Quadro atual');
    const button = screen.getByRole('button', {
      name: '+ Adicionar uma Tarefa',
    });
    const OpenMenuDropdownModal = screen.getByLabelText(
      'Menu Open/DropdownModal',
    );
    const OpenMenuElipsis = screen.getByLabelText('Open/Elipsis');

    expect(header).toBeInTheDocument();
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('alt', 'test.svg');
    expect(logoName).toBeInTheDocument();
    expect(CurrentBoardName).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(OpenMenuDropdownModal).toHaveStyle({
      display: 'none',
    });
    expect(OpenMenuElipsis).toBeInTheDocument();
  });

  it('should appear MenuElipsis when clicking on bottuno Open and disappear when clicking on bottan close', () => {
    renderTheme(<Header logo={'test.svg'} />, store);

    const menuElipsis = screen.getByLabelText('MenuElipsis');
    const openMenuElipsis = screen.getByLabelText('Open/Elipsis');

    fireEvent.click(openMenuElipsis);

    const closeMenuElipsis = screen.getByLabelText('Close/Elipsis');

    expect(menuElipsis).toHaveStyle({
      animation: 'openShow 300ms ease-in-out',
    });

    expect(closeMenuElipsis).toBeInTheDocument();

    fireEvent.click(closeMenuElipsis);

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
