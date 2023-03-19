import { fireEvent, screen, waitFor } from '@testing-library/react';
import { FormLogin } from '.';
import { renderTheme } from '../../utils/render-theme';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { GlobalStyles } from '../../styles/globals-styles';
import { signIn, SignInAuthorizationParams } from 'next-auth/react';
import { useRouter } from 'next/router';

jest.useFakeTimers();
jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
  }),
}));

describe('<FormLogin />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should to render a form', () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('should an error appears for not pressing the form and the disappers after 4 seconds', () => {
    const { rerender } = renderTheme(<FormLogin />);

    const button = screen.getByRole('button', { name: 'Entrar' });
    const message = screen.getByLabelText('Message');
    const conteinerMessageError = screen.getByLabelText('Message Error');

    fireEvent.click(button);
    expect(message).toHaveTextContent('Email e senha são obrigatórios!');
    expect(conteinerMessageError).toHaveStyle({
      animation: 'showMessage 300ms ease-in-out',
    });

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(conteinerMessageError).toHaveStyle({
      animation: 'hidenShowMessageError 1s ease-in-out',
    });

    rerender(
      <ThemeProvider theme={theme}>
        <FormLogin />
        <GlobalStyles />
      </ThemeProvider>,
    );

    const inputEmail = screen.getByPlaceholderText('Email');

    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } });
    fireEvent.click(button);
    expect(message).toHaveTextContent('Email e senha são obrigatórios!');
    expect(conteinerMessageError).toHaveStyle({
      animation: 'showMessage 300ms ease-in-out',
    });

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(conteinerMessageError).toHaveStyle({
      animation: 'hidenShowMessageError 1s ease-in-out',
    });
  });

  it('should return an error for not logging in your user', async () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');
    const message = screen.getByLabelText('Message');
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Senha');

    fireEvent.change(inputEmail, { target: { value: 'test@.gmail.com' } });
    fireEvent.change(inputPassword, { target: { value: 'eduj1234' } });

    await waitFor(() => {
      fireEvent.submit(form);

      expect(message).toHaveTextContent('Email Ou senha incorretos!');
    });
  });

  it('should To match snapshot', async () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');

    expect(form).toMatchSnapshot();
  });
});
