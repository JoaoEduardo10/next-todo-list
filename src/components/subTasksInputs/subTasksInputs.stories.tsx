import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { SubTasksInputs, SubTasksInputsProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';

export default {
  title: 'SubTasksInputs',
  component: SubTasksInputs,
  args: {
    clearInput: false,
    setSubTasks: () => [],
  } as SubTasksInputsProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof SubTasksInputs> = (
  agrs: SubTasksInputsProps,
) => {
  return <SubTasksInputs {...agrs} />;
};
