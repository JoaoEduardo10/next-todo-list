import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MenuMobile, MenuMobileProps } from '.';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { mockResponse } from '../../../.jest/setup-tests';
import { useAppSelector } from '../../app/hooks';
import configureStore from 'redux-mock-store';

jest.useFakeTimers();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({
  boards: [...mockResponse],
}) as any;

describe('<MenuMobile />', () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReturnValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Mobile menu with the links', () => {
    const props: MenuMobileProps = {
      show: true,
    };

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MenuMobile {...props} />
        </ThemeProvider>
      </Provider>,
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    const menu = screen.getByLabelText('Menu');
    const links = screen.getAllByLabelText('Links');

    expect(menu).toBeInTheDocument();
    expect(links.length).toBe(mockResponse.length);
  });

  it('should change background color of links when clicking on the', () => {
    const props: MenuMobileProps = {
      show: true,
    };

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MenuMobile {...props} />
        </ThemeProvider>
      </Provider>,
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    const link1 = screen.getAllByLabelText('Links')[0];

    const link2 = screen.getAllByLabelText('Links')[1];

    expect(link1).toHaveStyle({
      'background-color': theme.colors.purpleColor,
    });

    expect(link2).toHaveStyle({
      'background-color': 'transparent',
    });

    fireEvent.click(link2);

    expect(link2).toHaveStyle({
      'background-color': theme.colors.purpleColor,
    });

    expect(link1).toHaveStyle({
      'background-color': 'transparent',
    });
  });
});
