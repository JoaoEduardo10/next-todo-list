import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { TaskStatus, TaskStatusProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';
import { Provider } from 'react-redux';
import { store } from '../../utils/mocks';

export default {
  title: 'TaskStatus',
  component: TaskStatus,
  args: {
    status: 'pending',
  } as TaskStatusProps,
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

export const Tamplate: ComponentStory<typeof TaskStatus> = (
  agrs: TaskStatusProps,
) => {
  return (
    <div
      style={{
        width: '50%',
        padding: '1rem',
        margin: '0 auto',
        background: '#fff',
      }}
    >
      {' '}
      <TaskStatus {...agrs} />{' '}
    </div>
  );
};
