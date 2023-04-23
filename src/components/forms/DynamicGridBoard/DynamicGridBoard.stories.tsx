import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { DynamicGridBoard, DynamicGridBoardProps } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';
import { Provider } from 'react-redux';
import { store } from '../../../utils/mocks';

export default {
  title: 'fomrs/Board',
  component: DynamicGridBoard,
  args: {
    buttonName: 'Create teste StoryBook',
    rendering: true,
    show: true,
    text: 'Teste StoryBoo',
  } as DynamicGridBoardProps,
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

export const Tamplate: ComponentStory<typeof DynamicGridBoard> = (
  agrs: DynamicGridBoardProps,
) => {
  return (
    <div style={{ height: '100vh' }}>
      <DynamicGridBoard {...agrs} />
    </div>
  );
};
