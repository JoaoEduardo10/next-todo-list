import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { SubTasksModal, SubTasksModalProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';
import { mockSubTask } from './mock';
import { Provider } from 'react-redux';
import { store } from '../../utils/mocks';

export default {
  title: 'SubTasksModal',
  component: SubTasksModal,
  args: {
    subTasks: mockSubTask,
  } as SubTasksModalProps,
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

export const Tamplate: ComponentStory<typeof SubTasksModal> = (
  agrs: SubTasksModalProps,
) => {
  return (
    <div
      style={{
        background: '#fff',
        width: '30%',
        margin: '0 auto',
        padding: '3rem',
      }}
    >
      <SubTasksModal {...agrs} />
    </div>
  );
};
