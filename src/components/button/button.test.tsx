import { theme } from '../../styles/theme';
import { fireEvent, screen } from '@testing-library/react';
import { Button } from '.';
import { renderTheme } from '../../utils/render-theme';

describe('<Button />', () => {
  it('should render a button end clicked', () => {
    renderTheme(<Button>Children</Button>);

    const button = screen.getByRole('button', { name: 'Children' });

    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });

  it('should disable the button', () => {
    renderTheme(<Button disabled={true}>Children</Button>);

    const button = screen.getByRole('button', { name: 'Children' });

    expect(button).toBeDisabled();
    expect(button).toHaveStyle({
      'background-color': theme.colors.secondaryColor,
    });
  });

  it('should active the button click', () => {
    const fn = jest.fn();
    renderTheme(
      <Button disabled={false} handleOnClick={fn}>
        Children
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Children' });

    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should to match snapchot', () => {
    const fn = jest.fn();
    renderTheme(<Button handleOnClick={fn}>Children</Button>);

    const button = screen.getByRole('button');

    expect(button).toMatchInlineSnapshot(`
      .c0 {
        margin-top: 3rem;
        width: 16rem;
        padding: 1.6rem;
        background-color: #827FD3;
        border: none;
        border-radius: 1.6rem;
        font-size: 1.8rem;
        line-height: 100%;
        color: #FFFFFF;
        cursor: pointer;
        -webkit-transition: all 300ms ease-in-out;
        transition: all 300ms ease-in-out;
      }

      .c0:hover {
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
      }

      .c0:disabled {
        background-color: rgb(244,247,253);
        cursor: not-allowed;
        color: #000;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
      }

      <button
        class="c0"
      >
        Children
      </button>
    `);
  });
});
