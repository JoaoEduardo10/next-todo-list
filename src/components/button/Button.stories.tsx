import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Button, ButtonProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Button',
  } as ButtonProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof Button> = (agrs: ButtonProps) => {
  return <Button {...agrs} />;
};

export const TamplateDisabled: ComponentStory<typeof Button> = (
  agrs: ButtonProps,
) => {
  return <Button {...agrs} disabled={true} />;
};
