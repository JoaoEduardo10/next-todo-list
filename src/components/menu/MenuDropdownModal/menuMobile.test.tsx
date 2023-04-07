import { fireEvent, screen, act } from '@testing-library/react';
import { MenuDropdownModal } from '.';
import { theme } from '../../../styles/theme';
import { renderTheme } from '../../../utils/render-theme';
import configureStore from 'redux-mock-store';
import { link } from 'fs';

const mockStore = configureStore([]);
jest.useFakeTimers();

describe('MenuDropdownModal component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      boards: {
        allBoards: [
          { id: 'board1', boardName: 'Board 1' },
          { id: 'board2', boardName: 'Board 2' },
        ],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redender a mobile menu with links', () => {
    renderTheme(<MenuDropdownModal show={true} />, store);

    const menu = screen.getByLabelText('Menu');
    const links = screen.getAllByLabelText('Link');

    expect(menu).toBeInTheDocument();
    expect(links.length).toBe(2);
  });

  it('should does not show the animation when entering the site', () => {
    renderTheme(<MenuDropdownModal show={false} />, store);

    const menu = screen.getByLabelText('Menu');
    const links = screen.getAllByLabelText('Link');

    expect(menu).toBeInTheDocument();
    expect(links[0]).toHaveStyle({
      'background-color': theme.colors.purpleColor,
    });
    expect(links[1]).toHaveStyle({
      'background-color': 'transparent',
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });
  });

  it('should leave the first link already rendered', () => {
    renderTheme(<MenuDropdownModal show={true} />, store);

    const menu = screen.getByLabelText('Menu');
    const links = screen.getAllByLabelText('Link');

    expect(menu).toBeInTheDocument();
    expect(links[0]).toHaveStyle({
      'background-color': theme.colors.purpleColor,
    });
    expect(links[1]).toHaveStyle({
      'background-color': 'transparent',
    });
  });

  it('should change link on click', () => {
    renderTheme(<MenuDropdownModal show={true} />, store);

    const menu = screen.getByLabelText('Menu');
    const links = screen.getAllByLabelText('Link');

    expect(menu).toBeInTheDocument();
    expect(links[0]).toHaveStyle({
      'background-color': theme.colors.purpleColor,
    });
    expect(links[1]).toHaveStyle({
      'background-color': 'transparent',
    });

    fireEvent.click(links[1]);

    expect(links[0]).toHaveStyle({
      'background-color': 'transparent',
    });
    expect(links[1]).toHaveStyle({
      'background-color': theme.colors.purpleColor,
    });
  });

  it('should contain a bottan if it not listen for links', () => {
    const newStore = mockStore({
      boards: {
        allBoards: [],
      },
    });

    renderTheme(<MenuDropdownModal show={true} />, newStore);

    const menu = screen.getByLabelText('Menu');
    const links = screen.queryAllByLabelText('Link');
    const button = screen.getByLabelText('Conteiner Button').firstChild;

    expect(menu).toBeInTheDocument();
    expect(links.length).toBe(0);
    expect(button).toBeInTheDocument();
  });
});
