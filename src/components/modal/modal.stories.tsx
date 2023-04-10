import { Meta } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Modal } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';
import { Provider } from 'react-redux';
import { store } from '../../utils/mocks';

export default {
  title: 'Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Story />
          <GlobalStyles />
        </ThemeProvider>
      </Provider>
    ),
  ],
} as Meta;

export const Tamplate = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Modal />
    </div>
  );
};
