import { Meta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { StatusConteiner, StatusConteinerProps } from '.';
import { GlobalStyles } from '../../styles/globals-styles';
import { theme } from '../../styles/theme';
import { mockTask } from '../task/mock';

export default {
  title: 'StatusConteiner',
  component: StatusConteiner,
  args: {
    heading: 'concluded',
    tasks: mockTask,
  } as StatusConteinerProps,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
        <GlobalStyles />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const TamplateConcluded: ComponentStory<typeof StatusConteiner> = (
  agrs: StatusConteinerProps,
) => {
  return (
    <div style={{ height: '100vh' }}>
      <StatusConteiner {...agrs} />
    </div>
  );
};

export const TamplatePending: ComponentStory<typeof StatusConteiner> = (
  agrs: StatusConteinerProps,
) => {
  return (
    <div style={{ height: '100vh' }}>
      <StatusConteiner {...agrs} />
    </div>
  );
};

TamplatePending.args = {
  heading: 'pending',
  tasks: mockTask,
};

export const TamplateProgress: ComponentStory<typeof StatusConteiner> = (
  agrs: StatusConteinerProps,
) => {
  return (
    <div style={{ height: '100vh' }}>
      <StatusConteiner {...agrs} />
    </div>
  );
};

TamplateProgress.args = {
  heading: 'progress',
  tasks: mockTask,
};
