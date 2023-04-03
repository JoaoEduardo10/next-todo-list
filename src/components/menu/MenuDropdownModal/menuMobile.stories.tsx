import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MenuDropdownModal, MenuDropdownModalProps } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';
import { Provider } from 'react-redux';
import { mockBoards, store } from '../../../utils/mocks';

export default {
  title: 'MenuDropdownModalMobile',
  component: MenuDropdownModal,
  args: {
    show: true,
  } as MenuDropdownModalProps,
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
  parameters: {
    mockData: [
      {
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'GET',
        status: 200,
        response: {
          data: mockBoards,
        },
      },
    ],
  },
} as Meta;

export const Tamplate: ComponentStory<typeof MenuDropdownModal> = (
  agrs: MenuDropdownModalProps,
) => {
  return (
    <div
      style={{
        background: '#000',
        height: '100vh',
        width: '100%',
      }}
    >
      <MenuDropdownModal {...agrs} />
    </div>
  );
};

Tamplate.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};
