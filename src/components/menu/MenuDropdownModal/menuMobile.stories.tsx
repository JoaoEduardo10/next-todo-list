import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MenuDropdownModal, MenuDropdownModalProps } from '.';
import { GlobalStyles } from '../../../styles/globals-styles';
import { theme } from '../../../styles/theme';
import { Provider } from 'react-redux';
import { mockBoards, store } from '../../../utils/mocks';
import { store as storeUndefined } from '../../../app/store';

export default {
  title: 'menu/MenuDropdownModalMobile',
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
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
} as Meta;

export const TamplateWithLinks: ComponentStory<typeof MenuDropdownModal> = (
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

export const TamplateNotLinks: ComponentStory<typeof MenuDropdownModal> = (
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

TamplateNotLinks.decorators = [
  (Story) => (
    <Provider store={storeUndefined}>
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    </Provider>
  ),
];
