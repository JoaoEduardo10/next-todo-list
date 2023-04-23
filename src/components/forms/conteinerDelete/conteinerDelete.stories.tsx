import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { ConteinerDelete, ConteinerDeleteProps } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';

export default {
  title: 'ConteinerDelete',
  component: ConteinerDelete,
  args: {
    loading: false,
    rendered: true,
    textHeading: 'Board 1',
    textParagraph: 'tes certeza',
    showDelete: true,
  } as ConteinerDeleteProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof ConteinerDelete> = (
  agrs: ConteinerDeleteProps,
) => {
  return (
    <div style={{ width: '100%' }}>
      <ConteinerDelete {...agrs} />
    </div>
  );
};
