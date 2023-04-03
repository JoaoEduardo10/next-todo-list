import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MenuDropdownModal, MenuDropdownModalProps } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';

export default {
  title: 'MenuDropdownModal',
  component: MenuDropdownModal,
  args: {
    show: true,
  } as MenuDropdownModalProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof MenuDropdownModal> = (
  agrs: MenuDropdownModalProps,
) => {
  return <MenuDropdownModal {...agrs} />;
};
