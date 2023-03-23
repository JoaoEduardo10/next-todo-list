import { screen } from '@testing-library/react';
import { Header } from '.';
import { renderTheme } from '../../utils/render-theme';

describe('<Header />', () => {
  it('should', () => {
    renderTheme(<Header boardId="123" boardName="123" logo="img.svg" />);

    const header = screen.getByLabelText('Cabeçalho');

    expect(header).toBeInTheDocument();
  });
});
