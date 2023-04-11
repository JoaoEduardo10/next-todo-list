import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { FormLogin } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';

export default {
  title: 'fomrs/FormLogin',
  component: FormLogin,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof FormLogin> = () => {
  return <FormLogin />;
};

Tamplate.parameters = {
  nextRouter: {
    path: '/',
    asPath: '/',
    query: {},
  },
};
