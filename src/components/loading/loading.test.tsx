import { Loading } from '.';
import { renderTheme } from '../../utils/render-theme';

describe('<Loading />', () => {
  it('should to match snapchot', () => {
    const { container } = renderTheme(<Loading />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
