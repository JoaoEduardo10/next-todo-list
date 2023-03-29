import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { createTestStore } from '../utils/test-utils';
import { theme } from '../styles/theme';

const store = createTestStore();

export const renderTheme = (children: React.ReactNode): RenderResult => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>,
  );
};
