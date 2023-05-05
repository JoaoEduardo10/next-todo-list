import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MenuElipsisHeader, MenuElipsisHeaderProps } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';

export default {
  title: 'menu/MenuElipsisHeader',
  component: MenuElipsisHeader,
  args: {
    show: true,
  } as MenuElipsisHeaderProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const TamplateMenuElipsisHeader: ComponentStory<
  typeof MenuElipsisHeader
> = (agrs: MenuElipsisHeaderProps) => {
  return (
    <div
      style={{
        background: '#000',
        height: '100vh',
        width: '100%',
      }}
    >
      <MenuElipsisHeader {...agrs} />
    </div>
  );
};
