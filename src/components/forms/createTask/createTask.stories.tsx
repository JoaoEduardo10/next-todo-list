import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { CreateTasks, CreateTasksProps } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';
import { Provider } from 'react-redux';
import { store } from '../../../utils/mocks';

export default {
  title: 'forms/CreateTasks',
  component: CreateTasks,
  args: {
    rendering: true,
    setShowCreateTask: () => true,
    show: true,
  } as CreateTasksProps,
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

export const Tamplate: ComponentStory<typeof CreateTasks> = (
  agrs: CreateTasksProps,
) => {
  return <CreateTasks {...agrs} />;
};
