import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Header, HeaderProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';
import img from '../../../public/images/logo.svg';
import { Provider } from 'react-redux';
import { store } from '../../utils/mocks';

export default {
  title: 'Header',
  component: Header,
  args: {
    logo: img,
  } as HeaderProps,
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

export const Tamplate: ComponentStory<typeof Header> = (agrs: HeaderProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
      }}
    >
      <Header {...agrs} />
    </div>
  );
};
