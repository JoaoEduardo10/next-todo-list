import {
  fireEvent,
  queryByLabelText,
  screen,
  waitFor,
} from '@testing-library/react';
import { FormLogin } from '.';
import { renderTheme } from '../../utils/render-theme';
import { act } from 'react-dom/test-utils';
import * as nextAuthReact from 'next-auth/react';

jest.useFakeTimers();
jest.mock('next-auth/react');

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '/',
      push: jest.fn(),
    };
  },
}));

jest.spyOn(require('next/router'), 'useRouter');

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;

describe('<FormLogin />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should to render a form', () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('should return an error for not typing the email', async () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');

    const inputPassword = screen.getByPlaceholderText('Senha');

    fireEvent.change(inputPassword, { target: { value: '1234' } });

    fireEvent.submit(form);
    const message = await screen.findByLabelText('Message Error');

    expect(message).toHaveTextContent('Email e senha são obrigatórios!');
    expect(message).toBeInTheDocument();
  });

  it('should return an error for not typing the password', async () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');

    const inputEmail = screen.getByPlaceholderText('Email');

    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } });

    fireEvent.submit(form);
    const message = await screen.findByLabelText('Message Error');

    expect(message).toHaveTextContent('Email e senha são obrigatórios!');
    expect(message).toBeInTheDocument();
  });

  it('should make error message disappear', async () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');

    const inputEmail = screen.getByPlaceholderText('Email');

    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } });

    fireEvent.submit(form);
    const message = await screen.findByLabelText('Message Error');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(message).toHaveStyle({
      animation: 'hidenShowMessageError 1s ease-in-out',
    });
  });

  it('should but the user does not exist', async () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassowrd = screen.getByPlaceholderText('Senha');

    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } });
    fireEvent.change(inputPassowrd, { target: { value: 'eduj1234' } });

    fireEvent.submit(form);
    const message = await screen.findByLabelText('Message Error');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(message).toHaveTextContent('Email Ou senha incorretos!');
    expect(message).toHaveStyle({
      animation: 'hidenShowMessageError 1s ease-in-out',
    });
  });

  it('should log the user and go to the home page', async () => {
    nextAuthReactMocked.signIn.mockImplementation(() =>
      Promise.resolve({ error: '', status: 200, ok: true, url: '' }),
    );

    useRouter.mockImplementation(() => ({
      useRouter() {
        return {
          route: '/',
          pathname: '',
          query: '',
          asPath: '/',
          push: jest.fn(),
        };
      },
    }));

    await act(async () => {
      renderTheme(<FormLogin />);
    });
    const form = screen.getByRole('form');

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassowrd = screen.getByPlaceholderText('Senha');

    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } });
    fireEvent.change(inputPassowrd, { target: { value: 'eduj1234' } });

    fireEvent.submit(form);

    await waitFor(() => {
      const message = screen.queryByLabelText('Message Error');

      expect(message).not.toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });
  });

  it('should to Match Snapchot', () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');

    expect(form).toMatchSnapshot();
  });
});
