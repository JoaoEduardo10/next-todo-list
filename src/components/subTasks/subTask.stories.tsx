import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { SubTasks, SubTasksProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';

export default {
  title: 'SubTasks',
  component: SubTasks,
  args: {
    clearInput: false,
    setSubTasks: () => [],
  } as SubTasksProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof SubTasks> = (
  agrs: SubTasksProps,
) => {
  return <SubTasks {...agrs} />;
};
