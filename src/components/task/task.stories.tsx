import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Task, TaskProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';
import { mockTask } from './mock';
import { Provider } from 'react-redux';
import { store } from '../../utils/mocks';

export default {
  title: 'Task',
  component: Task,
  args: {
    tasks: mockTask,
  } as TaskProps,
  decorators: [
    (Story) => (
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
      </Provider>
    ),
  ],
} as Meta;

export const TamplateTaskAll: ComponentStory<typeof Task> = (
  agrs: TaskProps,
) => {
  return (
    <div
      style={{
        width: '20rem',
      }}
    >
      <Task {...agrs} />
    </div>
  );
};
