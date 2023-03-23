import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Header, HeaderProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';
import img from '../../../public/images/logo.svg';

export default {
  title: 'Header',
  component: Header,
  args: {
    boardName: 'test',
    boardId: '1234',
    logo: img,
  } as HeaderProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Tamplate: ComponentStory<typeof Header> = (agrs: HeaderProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
      }}
    >
      <Header {...agrs} />
    </div>
  );
};
