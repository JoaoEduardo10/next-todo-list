import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MessageError, MessageErrorProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';

export default {
  title: 'MessageError',
  component: MessageError,
  args: {
    error: true,
    text: 'Test Error',
  } as MessageErrorProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const MessageExist: ComponentStory<typeof MessageError> = (
  agrs: MessageErrorProps,
) => {
  return <MessageError {...agrs} error={true} />;
};

export const MessageNotExist: ComponentStory<typeof MessageError> = (
  agrs: MessageErrorProps,
) => {
  return <MessageError {...agrs} error={false} />;
};
