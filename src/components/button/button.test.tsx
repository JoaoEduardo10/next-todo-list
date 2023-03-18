import { theme } from '../../styles/theme';
import { screen } from '@testing-library/react';
import { Button } from '.';
import { renderTheme } from '../../utils/render-theme';

describe('<Button />', () => {
  it('should render a button', () => {
    renderTheme(<Button>Children</Button>);

    const button = screen.getByRole('button', { name: 'Children' });

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
});
