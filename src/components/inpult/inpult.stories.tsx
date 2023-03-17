import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Inpult, TInpultProps } from './inpult';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';

export default {
  title: 'Inpult',
  component: Inpult,
  args: {
    placeholder: 'Passowrd',
    type: 'password',
  } as TInpultProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const TamplateInpultText: ComponentStory<typeof Inpult> = (
  agrs: TInpultProps,
) => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        padding: '5rem',
      }}
    >
      <Inpult {...agrs} placeholder={'Text'} type={'text'} />
    </div>
  );
};

export const TamplateInpultEmail: ComponentStory<typeof Inpult> = (
  agrs: TInpultProps,
) => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        padding: '5rem',
      }}
    >
      <Inpult {...agrs} placeholder={'Email'} type={'email'} />
    </div>
  );
};

export const TamplateInpultPassword: ComponentStory<typeof Inpult> = (
  agrs: TInpultProps,
) => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        padding: '5rem',
      }}
    >
      <Inpult {...agrs} placeholder={'Password'} type={'password'} />
    </div>
  );
};
