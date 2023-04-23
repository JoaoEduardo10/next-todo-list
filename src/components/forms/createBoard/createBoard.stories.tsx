import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { CreateBoard, CreateBoardProps } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';
import { Provider } from 'react-redux';
import { store } from '../../../utils/mocks';

export default {
  title: 'fomrs/Board',
  component: CreateBoard,
  args: {
    buttonName: 'Create teste StoryBook',
    rendering: true,
    show: true,
    text: 'Teste StoryBoo',
  } as CreateBoardProps,
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

export const Tamplate: ComponentStory<typeof CreateBoard> = (
  agrs: CreateBoardProps,
) => {
  return (
    <div style={{ height: '100vh' }}>
      <CreateBoard {...agrs} />
    </div>
  );
};
