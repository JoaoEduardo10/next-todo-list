import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { UpdateBoard, UpdateBoardProps } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';
import { Provider } from 'react-redux';
import { store } from '../../../utils/mocks';

export default {
  title: 'forms/UpdateBoard',
  component: UpdateBoard,
  args: {
    rendering: true,
    show: true,
  } as UpdateBoardProps,
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

export const Tamplate: ComponentStory<typeof UpdateBoard> = (
  agrs: UpdateBoardProps,
) => {
  return <UpdateBoard {...agrs} />;
};
