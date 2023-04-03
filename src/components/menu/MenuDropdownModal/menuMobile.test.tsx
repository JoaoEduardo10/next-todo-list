import { render, fireEvent, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MenuDropdownModal } from '.';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { GlobalStyles } from '../../../styles/globals-styles';

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
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MenuDropdownModal show={true} />
          <GlobalStyles />
        </ThemeProvider>
      </Provider>,
    );

    const menu = screen.getByLabelText('Menu');
    const links = screen.getAllByLabelText('Link');

    expect(menu).toBeInTheDocument();
    expect(links.length).toBe(2);
  });

  it('should would render the first link with being active', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MenuDropdownModal show={true} />
          <GlobalStyles />
        </ThemeProvider>
      </Provider>,
    );

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
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MenuDropdownModal show={true} />
          <GlobalStyles />
        </ThemeProvider>
      </Provider>,
    );

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
    const newstore = mockStore({
      boards: [],
    });

    render(
      <Provider store={newstore}>
        <ThemeProvider theme={theme}>
          <MenuDropdownModal show={true} />
          <GlobalStyles />
        </ThemeProvider>
      </Provider>,
    );

    const conteinerDivButton = screen.getByLabelText('Conteiner Button');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(conteinerDivButton).toBeInTheDocument();
  });

  it('should not render a MenuDropdownModal', () => {
    const newstore = mockStore({
      boards: [],
    });

    render(
      <Provider store={newstore}>
        <ThemeProvider theme={theme}>
          <MenuDropdownModal show={false} />
          <GlobalStyles />
        </ThemeProvider>
      </Provider>,
    );

    const menu = screen.getByLabelText('Menu');

    act(() => {
      jest.advanceTimersByTime(500);
    });
  });
});
