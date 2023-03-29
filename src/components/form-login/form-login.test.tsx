import {
  findByLabelText,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormLogin } from '.';
import { renderTheme } from '../../utils/render-theme';
import * as nextAuthReact from 'next-auth/react';
import { act } from 'react-dom/test-utils';

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

  it('should render a FormLogin', () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('should return an error by not sending the email', async () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');
    const password = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button');

    expect(form).toBeInTheDocument();

    fireEvent.change(password, { target: { value: '123' } });

    userEvent.click(button);

    const messageTrue = await screen.findByLabelText('Message Error');

    expect(messageTrue).toBeInTheDocument();
    expect(messageTrue).toHaveTextContent('Email e senha são obrigatórios!');
  });

  it('should return an error by not sending the password', async () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');
    const email = screen.getByPlaceholderText('Email');
    const button = screen.getByRole('button');

    expect(form).toBeInTheDocument();

    fireEvent.change(email, { target: { value: '123@gmail.com' } });

    userEvent.click(button);

    const messageTrue = await screen.findByLabelText('Message Error');

    expect(messageTrue).toBeInTheDocument();
    expect(messageTrue).toHaveTextContent('Email e senha são obrigatórios!');
  });

  it('should disappear with the error message', async () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');
    const email = screen.getByPlaceholderText('Email');
    const button = screen.getByRole('button');

    expect(form).toBeInTheDocument();

    fireEvent.change(email, { target: { value: '123@gmail.com' } });

    userEvent.click(button);

    const message = await screen.findByLabelText('Message Error');

    expect(message).toHaveStyle({
      animation: 'showMessage 300ms ease-in-out',
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(message).toHaveStyle({
      animation: 'hidenShowMessageError 1s ease-in-out',
    });
  });

  it('should return an error for not having a user loginIn', async () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button');

    expect(form).toBeInTheDocument();

    fireEvent.change(email, { target: { value: '123@gmail.com' } });
    fireEvent.change(password, { target: { value: '123' } });

    userEvent.click(button);

    const message = await screen.findByLabelText('Message Error');

    expect(message).toHaveTextContent('Email Ou senha incorretos!');
  });

  it('should login a user', async () => {
    nextAuthReactMocked.signIn.mockResolvedValueOnce({
      ok: true,
      status: 200,
      url: '',
      error: '',
    });

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
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button');

    expect(form).toBeInTheDocument();

    fireEvent.change(email, { target: { value: 'test@gmail.com' } });
    fireEvent.change(password, { target: { value: 'eduj1234' } });

    fireEvent.submit(form);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      const message = screen.queryByLabelText('Message Error');

      expect(message).not.toBeInTheDocument();
    });
  });

  it('should to Match Snapshot', async () => {
    const { container } = renderTheme(<FormLogin />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
