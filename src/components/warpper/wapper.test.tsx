import { Warpper } from '.';
import { renderTheme } from '../../utils/render-theme';

describe('<Warpper />', () => {
  it('should render wapper with snapshot', () => {
    const { container } = renderTheme(<Warpper>Children</Warpper>);

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        height: 100vh;
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-position: center;
        background-size: cover;
        background: linear-gradient( 90deg,rgba(2,0,36,1) 0%,rgba(32,9,121,1) 57%,rgba(0,212,255,1) 100% );
        top: 0%;
        left: 0%;
        height: 100vh;
        width: 100%;
      }

      <section
        class="c0"
      >
        Children
      </section>
    `);
  });
});
