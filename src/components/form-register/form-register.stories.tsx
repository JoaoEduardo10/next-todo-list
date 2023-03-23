import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { FormRegister } from './form-register';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';

export default {
  title: 'FormRegister',
  component: FormRegister,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const TamplateFormRegister: ComponentStory<typeof FormRegister> = () => {
  return <FormRegister />;
};

TamplateFormRegister.parameters = {
  nextRouter: {
    path: '/login',
    asPath: '/login',
    query: {},
  },
};
