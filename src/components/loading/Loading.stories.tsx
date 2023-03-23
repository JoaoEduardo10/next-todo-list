import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Loading } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';

export default {
  title: 'Loading',
  component: Loading,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof Loading> = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <Loading />
    </div>
  );
};
