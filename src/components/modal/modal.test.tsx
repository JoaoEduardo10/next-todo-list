import { Modal } from '.';
import { renderTheme } from '../../utils/render-theme';
import { store } from '../../utils/mocks';
import { useSession } from 'next-auth/react';
import { act, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

jest.mock('next-auth/react');

describe('<Modal />', () => {
  const nextAuthUseSessionMock = useSession as jest.MockedFunction<
    typeof useSession
  >;

  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it('should a render component modal with statusConteiner component', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    nextAuthUseSessionMock.mockReturnValue({
      data: [{ user: 'test' }],
      status: 'authenticated',
    } as any);

    await act(async () => renderTheme(<Modal />, store));

    const modal = screen.getByLabelText('Modal');
    const statusConteiner = screen.getAllByLabelText('Conteiners Tasks');

    expect(modal).toBeInTheDocument();
    expect(statusConteiner.length).toBe(3);

    expect(statusConteiner[0].firstChild).toHaveTextContent(/pending/);
    expect(statusConteiner[1].firstChild).toHaveTextContent(/progress/);
    expect(statusConteiner[2].firstChild).toHaveTextContent(/concluded/);
  });

  it('should not render component modal with statusConteiner component', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    nextAuthUseSessionMock.mockReturnValue({
      data: [{ user: 'test' }],
      status: 'authenticated',
    } as any);

    await act(async () => renderTheme(<Modal />));

    const modal = screen.queryByLabelText('Modal');
    const notModal = screen.getByLabelText('Sem Quadros');

    expect(modal).not.toBeInTheDocument();
    expect(notModal).toBeInTheDocument();
    expect(notModal.firstChild).toHaveTextContent('Não há quadros!');
  });

  it('should render the model with the statusConteiner but the user is not logging in', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    nextAuthUseSessionMock.mockReturnValue({
      data: '',
      status: '',
    } as any);

    await act(async () => renderTheme(<Modal />, store));

    const modal = screen.getByLabelText('Modal');
    const statusConteiner = screen.getAllByLabelText('Conteiners Tasks');

    expect(modal).toBeInTheDocument();
    expect(statusConteiner.length).toBe(3);

    expect(statusConteiner[0].firstChild).toHaveTextContent(/pending/);
    expect(statusConteiner[1].firstChild).toHaveTextContent(/progress/);
    expect(statusConteiner[2].firstChild).toHaveTextContent(/concluded/);
  });
});
