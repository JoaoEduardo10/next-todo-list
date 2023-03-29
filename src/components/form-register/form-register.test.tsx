import { FormRegister } from './form-register';
import { renderTheme } from '../../utils/render-theme';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

jest.useFakeTimers();
jest.mock('next-auth/react');

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/login',
      pathname: '',
      query: '',
      asPath: '/login',
      push: jest.fn(),
    };
  },
}));

jest.spyOn(require('next/router'), 'useRouter');

describe('<FormRegister />', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it('should render a FormsRegister', () => {
    renderTheme(<FormRegister />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('should return an error by not sending the email', async () => {
    renderTheme(<FormRegister />);

    const form = screen.getByRole('form');
    const name = screen.getByPlaceholderText('Nome');
    const password = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button');

    expect(form).toBeInTheDocument();

    fireEvent.change(name, { target: { value: 'test' } });
    fireEvent.change(password, { target: { value: 'test123' } });

    fireEvent.click(button);

    const message = await screen.findByLabelText('Message Error');

    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Email, name e senha são obrigatórios!');
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

  it('should return an error by not sending the password', async () => {
    renderTheme(<FormRegister />);

    const form = screen.getByRole('form');
    const name = screen.getByPlaceholderText('Nome');
    const email = screen.getByPlaceholderText('Email');
    const button = screen.getByRole('button');

    expect(form).toBeInTheDocument();

    fireEvent.change(name, { target: { value: 'test' } });
    fireEvent.change(email, { target: { value: 'test123@gmail.com' } });

    fireEvent.click(button);

    const message = await screen.findByLabelText('Message Error');

    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Email, name e senha são obrigatórios!');
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

  it('should return an error by not sending the name', async () => {
    renderTheme(<FormRegister />);

    const form = screen.getByRole('form');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button');

    expect(form).toBeInTheDocument();

    fireEvent.change(email, { target: { value: 'test123@gmail.com' } });
    fireEvent.change(password, { target: { value: 'test123' } });

    fireEvent.click(button);

    const message = await screen.findByLabelText('Message Error');

    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Email, name e senha são obrigatórios!');
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

  it('should returns an error because the user email already exists', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
    } as any);

    renderTheme(<FormRegister />);

    const form = screen.getByRole('form');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Senha');
    const name = screen.getByPlaceholderText('Nome');

    expect(form).toBeInTheDocument();

    fireEvent.change(email, { target: { value: 'test123@gmail.com' } });
    fireEvent.change(password, { target: { value: 'test123' } });
    fireEvent.change(name, { target: { value: 'test' } });

    fireEvent.submit(form);

    const message = await screen.findByLabelText('Message Error');

    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Email Ou senha incorretos!');
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

  it('should created a user', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
    } as any);

    renderTheme(<FormRegister />);

    const form = screen.getByRole('form');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Senha');
    const name = screen.getByPlaceholderText('Nome');

    expect(form).toBeInTheDocument();

    fireEvent.change(email, { target: { value: 'test123@gmail.com' } });
    fireEvent.change(password, { target: { value: 'test123' } });
    fireEvent.change(name, { target: { value: 'test' } });

    fireEvent.submit(form);

    await waitFor(() => {
      const message = screen.queryByLabelText('Message Error');

      expect(message).not.toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });
  });

  it('should to match snapsho', async () => {
    const { container } = renderTheme(<FormRegister />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
