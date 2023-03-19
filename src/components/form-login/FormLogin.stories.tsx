import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { FormLogin } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';

export default {
  title: 'FormLogin',
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
  return (
    <div
      style={{
        background: 'black',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormLogin />
    </div>
  );
};
