import { TaskStatus } from '.';
import { renderTheme } from '../../utils/render-theme';
import { useSession } from 'next-auth/react';
import { fireEvent, screen } from '@testing-library/react';
import { store } from '../../utils/mocks';
import fetchMock from 'jest-fetch-mock';

jest.mock('next-auth/react');

describe('<TaskStatus />', () => {
  const useSessionMock = useSession as jest.MockedFunction<typeof useSession>;

  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.enableMocks();

    useSessionMock.mockReturnValue({
      data: [{ user: 'test' }],
      status: 'authenticated',
    } as any);
  });

  afterEach(() => {
    fetchMock.resetMocks();
    jest.resetAllMocks();
  });

  it('should render a TaskStatus component', () => {
    renderTheme(<TaskStatus status="pending" update={false} />, store);

    const heading = screen.getByRole('heading', { name: 'Status atual' });
    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');

    expect(heading).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(options.length).toEqual(3);
  });

  it('should should change the selectt', () => {
    renderTheme(<TaskStatus status="pending" update={false} />, store);

    const select: any = screen.getByRole('combobox');

    expect(select).toBeInTheDocument();
    expect(select.value).toEqual('pending');

    fireEvent.change(select, { target: { value: 'concluded' } });
    expect(select.value).toEqual('concluded');
  });
});
