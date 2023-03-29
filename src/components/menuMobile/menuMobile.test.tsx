import { act, render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../../app/store';
import { MenuMobile, MenuMobileProps } from '.';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { mockResponse } from '../../../.jest/setup-tests';

jest.useFakeTimers();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('<MenuMobile />', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockReturnValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should MenuMobile renderiza corretamente', () => {
    const props: MenuMobileProps = {
      show: true,
    };

    const { getByText } = render(
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

    expect(menu).toBeInTheDocument();
  });
});
