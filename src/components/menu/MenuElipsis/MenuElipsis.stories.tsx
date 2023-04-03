import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MenuElipsis, MenuElipsisProps } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';

export default {
  title: 'menu/MenuElipsis',
  component: MenuElipsis,
  args: {
    show: true,
  } as MenuElipsisProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const TamplateMenuElipsis: ComponentStory<typeof MenuElipsis> = (
  agrs: MenuElipsisProps,
) => {
  return (
    <div
      style={{
        background: '#000',
        height: '100vh',
        width: '100%',
      }}
    >
      <MenuElipsis {...agrs} />
    </div>
  );
};
