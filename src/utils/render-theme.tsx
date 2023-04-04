import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { store as storeActual } from '../app/store';
import { Provider } from 'react-redux';

export const renderTheme = (
  children: React.ReactNode,
  store?: any,
): RenderResult => {
  return render(
    <Provider store={store ?? storeActual}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>,
  );
};
