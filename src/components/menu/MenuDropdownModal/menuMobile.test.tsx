import { fireEvent, screen, act } from '@testing-library/react';
import { MenuDropdownModal } from '.';
import { theme } from '../../../styles/theme';
import { renderTheme } from '../../../utils/render-theme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
jest.useFakeTimers();

describe('MenuDropdownModal component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      boards: [
        { id: 'board1', boardName: 'Board 1' },
        { id: 'board2', boardName: 'Board 2' },
      ],
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

  it('should would render the first link with being active', () => {
    renderTheme(<MenuDropdownModal show={true} />, store);

    const links = screen.getAllByLabelText('Link');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(links[0]).toHaveStyle({
      'background-color': theme.colors.purpleColor,
    });
    expect(links[1]).toHaveStyle({
      'background-color': 'transparent',
    });
  });

  it('should make the link you click active', () => {
    renderTheme(<MenuDropdownModal show={true} />, store);

    const links = screen.getAllByLabelText('Link');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.click(links[1]);

    expect(links[0]).toHaveStyle({
      'background-color': 'transparent',
    });

    expect(links[1]).toHaveStyle({
      'background-color': theme.colors.purpleColor,
    });
  });

  it('should redefine the buttao to create a board', () => {
    const newStore = mockStore({
      boards: [],
    });

    renderTheme(<MenuDropdownModal show={true} />, newStore);

    const conteinerDivButton = screen.getByLabelText('Conteiner Button');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(conteinerDivButton).toBeInTheDocument();
  });

  it('should not render a MenuDropdownModal', () => {
    const newStore = mockStore({
      boards: [],
    });

    renderTheme(<MenuDropdownModal show={false} />, newStore);

    const menu = screen.getByLabelText('Menu');

    act(() => {
      jest.advanceTimersByTime(500);
    });
  });

  it('should to match snapshot', () => {
    renderTheme(<MenuDropdownModal show={true} />, store);

    const menu = screen.getByLabelText('Menu');

    expect(menu).toMatchSnapshot();
  });
});
