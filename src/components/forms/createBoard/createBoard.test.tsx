import { act, fireEvent, screen } from '@testing-library/react';
import { CreateBoard } from '.';
import { renderTheme } from '../../../utils/render-theme';
import { useSession } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';

jest.mock('next-auth/react');

describe('<CreateBoard />', () => {
  const setShow = jest.fn();
  const useSessionMock = useSession as jest.MockedFunction<typeof useSession>;

  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.enableMocks();
    jest.useFakeTimers();

    useSessionMock.mockReturnValue({
      data: [{ user: 'test' }],
      status: 'authenticated',
    } as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.resetMocks();
  });

  it('should render a CreateBoard component', () => {
    renderTheme(
      <CreateBoard
        buttonName="Create Board"
        rendering={true}
        setShow={setShow}
        show={true}
        text="create Board"
      />,
    );

    const dynamicBoard = screen.getByLabelText('Dynamic Board');
    const form = screen.getByRole('form');
    const heading = screen.getByRole('heading', { name: 'create Board' });

    expect(dynamicBoard).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('create Board');
  });

  it('should close the createBoard', () => {
    renderTheme(
      <CreateBoard
        buttonName="Create Board"
        rendering={true}
        setShow={setShow}
        show={true}
        text="create Board"
      />,
    );

    const closeDynamicBoardButton = screen.getByLabelText('Close DynamicBoard');

    expect(closeDynamicBoardButton).toBeInTheDocument();

    fireEvent.click(closeDynamicBoardButton);

    expect(setShow).toHaveBeenCalledWith(false);
  });

  it('should show an error message for not adding a boardname', () => {
    renderTheme(
      <CreateBoard
        buttonName="Create Board"
        rendering={true}
        setShow={setShow}
        show={true}
        text="create Board"
      />,
    );

    const form = screen.getByRole('form');
    const messageError = screen.getByLabelText('Message Error');

    expect(messageError).toHaveTextContent('');

    fireEvent.submit(form);

    expect(messageError).toHaveTextContent('Adione um Nome Para o Quadro');
    expect(messageError).toHaveStyle({
      opacity: '1',
    });

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(messageError).toHaveStyle({
      opacity: '0',
    });
  });

  it('should create a board or update', async () => {
    fetchMock.mockReturnValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as any);

    await act(async () =>
      renderTheme(
        <CreateBoard
          buttonName="Create Board"
          rendering={true}
          setShow={setShow}
          show={true}
          text="create Board"
        />,
      ),
    );

    const input = screen.getByPlaceholderText('Nome do Quadro');
    const form = screen.getByRole('form');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'test' } });

    fireEvent.submit(form);
  });
});
