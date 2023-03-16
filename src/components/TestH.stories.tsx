import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Test } from './TestH';
import { GlobalStyles } from '../styles/globals-styles';
import { theme } from '../styles/theme';

export default {
  title: 'Test',
  component: Test,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof Test> = () => {
  return <Test />;
};
