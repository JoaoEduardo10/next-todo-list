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
});
