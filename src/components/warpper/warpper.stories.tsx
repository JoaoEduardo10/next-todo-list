import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Warpper, WarpperProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';
import { FormLogin } from '../form-login';

export default {
  title: 'Warpper',
  component: Warpper,
  args: {
    children: 'Test',
  } as WarpperProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof Warpper> = (
  agrs: WarpperProps,
) => {
  return <Warpper {...agrs} />;
};
