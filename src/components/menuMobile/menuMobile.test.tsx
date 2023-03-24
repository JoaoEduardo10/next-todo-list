import { act, screen } from '@testing-library/react';
import { MenuMobile } from '.';
import { renderTheme } from '../../utils/render-theme';
import 'jest-styled-components';
import { theme } from '../../styles/theme';

jest.useFakeTimers();

describe('<MenuMobile />', () => {
  it('should render a menu', () => {
    renderTheme(<MenuMobile show={true} />);

    const menu = screen.getByLabelText('Menu');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(menu).toBeInTheDocument();
    expect(menu).toHaveStyleRule('display', 'flex', {
      media: theme.media.phone,
    });
    expect(menu).toHaveStyleRule('animation', 'showMenu 300ms ease-in-out', {
      media: theme.media.phone,
    });
  });

  it('should render not a menu', () => {
    renderTheme(<MenuMobile show={false} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    const menu = screen.queryByLabelText('Menu');

    expect(menu).toBeInTheDocument();
    expect(menu).toHaveStyleRule('display', 'none');
    expect(menu).toHaveStyleRule('display', 'flex', {
      media: theme.media.phone,
    });
    expect(menu).toHaveStyleRule('animation', 'hiddenShow 300ms ease-in-out', {
      media: theme.media.phone,
    });
  });
});
