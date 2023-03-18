import { fireEvent, screen } from '@testing-library/react';
import { FormLogin } from '.';
import { renderTheme } from '../../utils/render-theme';
import mockRouter from 'next-router-mock';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next-auth/react');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('<FormLogin />', () => {
  it('should to render a form', () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('should login the user', () => {
    window.alert = jest.fn();
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button', { name: 'Entrar' });

    fireEvent.change(inputEmail, {
      target: { value: 'joaoeduardo@gmail.com' },
    });
    fireEvent.change(inputPassword, { target: { value: 'eduj1234' } });

    fireEvent.click(button);
    mockRouter.push('/');
  });

  it('should login the user', () => {
    renderTheme(<FormLogin />);

    const form = screen.getByRole('form');
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button', { name: 'Entrar' });

    fireEvent.change(inputEmail, {
      target: { value: '' },
    });
    fireEvent.change(inputPassword, { target: { value: 'eduj1234' } });

    act(() => {
      fireEvent.click(button);
    });

    expect(inputEmail).toHaveValue('');
  });
});
