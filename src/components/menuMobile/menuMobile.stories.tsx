import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MenuMobile, MenuMobileProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';

export default {
  title: 'MenuMobile',
  component: MenuMobile,
  args: {
    show: true,
  } as MenuMobileProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof MenuMobile> = (
  agrs: MenuMobileProps,
) => {
  return <MenuMobile {...agrs} />;
};
