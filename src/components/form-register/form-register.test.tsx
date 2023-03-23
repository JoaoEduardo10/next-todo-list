import { FormRegister } from './form-register';
import { renderTheme } from '../../utils/render-theme';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';

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

jest.useFakeTimers();

describe('<FormRegister />', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should returns an error for not sending the email', async () => {
    renderTheme(<FormRegister />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Enviar' });

    await waitFor(() => userEvent.click(button));

    const message = await screen.findByLabelText('Message Error');

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

  it('should returns an error for not sending the passowrd', async () => {
    renderTheme(<FormRegister />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();

    const email = screen.getByPlaceholderText('Email');
    const name = screen.getByPlaceholderText('Nome');

    const button = screen.getByRole('button', { name: 'Enviar' });

    fireEvent.change(email, { target: { value: 'test@gmail.com' } });
    userEvent.type(name, 'test@123');

    userEvent.click(button);

    const message = await screen.findByLabelText('Message Error');

    expect(message).toHaveTextContent('Email, name e senha são obrigatórios!');
  });

  it('should returns an error for not sending the name', async () => {
    renderTheme(<FormRegister />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();

    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Senha');

    const button = screen.getByRole('button', { name: 'Enviar' });

    fireEvent.change(email, { target: { value: 'test@gmail.com' } });
    fireEvent.change(password, { target: { value: 'test123' } });

    userEvent.click(button);

    const message = await screen.findByLabelText('Message Error');

    expect(message).toHaveTextContent('Email, name e senha são obrigatórios!');
  });

  it('should return an error for not creating a user', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
    } as any);

    await act(async () => renderTheme(<FormRegister />));

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();

    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Senha');
    const name = screen.getByPlaceholderText('Nome');

    const button = screen.getByRole('button', { name: 'Enviar' });

    fireEvent.change(email, { target: { value: 'test@gmail.com' } });
    fireEvent.change(password, { target: { value: 'test123' } });
    fireEvent.change(name, { target: { value: 'test123' } });

    fireEvent.click(button);

    jest.advanceTimersByTime(5000);

    const message = screen.queryByLabelText('Message Error');

    expect(message).not.toBeInTheDocument();
  });

  it('should creating a user', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: () => Promise.resolve(true),
    } as any);

    await act(async () => {
      renderTheme(<FormRegister />);
    });

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();

    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Senha');
    const name = screen.getByPlaceholderText('Nome');

    const button = screen.getByRole('button', { name: 'Enviar' });

    fireEvent.change(email, { target: { value: 'dcsc@gmail.com' } });
    fireEvent.change(password, { target: { value: 'test123' } });
    fireEvent.change(name, { target: { value: 'test123' } });

    fireEvent.click(button);
  });
});
