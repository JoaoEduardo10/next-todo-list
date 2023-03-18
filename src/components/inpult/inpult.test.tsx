import { Inpult } from './inpult';
import { renderTheme } from '../../utils/render-theme';
import { fireEvent, screen } from '@testing-library/react';
import { theme } from '../../styles/theme';

describe('<Inpult />', () => {
  const fn = jest.fn();

  it('should an email input', () => {
    renderTheme(<Inpult placeholder="email" type="email" onChange={fn} />);

    const input = screen.getByPlaceholderText('email');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should an password input', () => {
    renderTheme(
      <Inpult placeholder="password" type="password" onChange={fn} />,
    );

    const input = screen.getByPlaceholderText('password');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should show the password', () => {
    renderTheme(
      <Inpult placeholder="password" type="password" onChange={fn} />,
    );

    const input = screen.getByPlaceholderText('password');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');

    const iconClose = screen.getByLabelText('Password close');

    fireEvent.click(iconClose);

    expect(input).toHaveAttribute('type', 'text');
  });

  it('should hide the password', () => {
    renderTheme(
      <Inpult placeholder="password" type="password" onChange={fn} />,
    );

    const input = screen.getByPlaceholderText('password');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');

    const iconClose = screen.getByLabelText('Password close');

    fireEvent.click(iconClose);

    const iconOpen = screen.getByLabelText('Password open');

    fireEvent.click(iconOpen);

    expect(input).toHaveAttribute('type', 'password');
  });

  it('should an text input', () => {
    renderTheme(<Inpult placeholder="text" type="text" onChange={fn} />);

    const input = screen.getByPlaceholderText('text');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should an test typing in the input', () => {
    renderTheme(<Inpult placeholder="email" type="email" onChange={fn} />);

    const input = screen.getByPlaceholderText('email');

    fireEvent.change(input, { target: { value: 'digitou' } });
    expect(input).toHaveValue('digitou');

    fireEvent.change(input, { target: { value: '' } });

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should activate animation', () => {
    renderTheme(<Inpult placeholder="text" type="text" onChange={fn} />);

    const label = screen.getByLabelText('Label conteiner');

    const input = screen.getByPlaceholderText('text');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '' } });

    expect(label).toHaveStyle({
      'box-shadow': `1rem 1rem 3rem ${theme.colors.purpleColor}`,
    });
  });

  it('should desative animation', () => {
    renderTheme(<Inpult placeholder="text" type="text" onChange={fn} />);

    const label = screen.getByLabelText('Label conteiner');

    const input = screen.getByPlaceholderText('text');

    fireEvent.blur(input);

    expect(label).toHaveStyle({
      'box-shadow': `1rem 1rem 1.6rem ${theme.colors.secondaryColor}`,
    });
  });

  it('should an text input onChange', () => {
    renderTheme(<Inpult placeholder="text" type="text" onChange={fn} />);

    const input = screen.getByPlaceholderText('text');

    fireEvent.change(input, { target: { value: 'aaa' } });

    expect(fn).toHaveBeenCalledTimes(3);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should an text input no onChange', () => {
    renderTheme(<Inpult placeholder="text" type="text" />);

    const input = screen.getByPlaceholderText('text');

    fireEvent.change(input, { target: { value: 'aaa' } });

    expect(fn).toHaveBeenCalledTimes(3);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should return a red board indicating an error', () => {
    renderTheme(<Inpult placeholder="text" type="text" messagerError="erro" />);

    const input = screen.getByPlaceholderText('text');
    const label = screen.getByLabelText('Label conteiner');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(label).toHaveStyle({
      border: '0.2rem solid #ad081b',
    });
  });

  it('should to match snapshot', () => {
    const { container } = renderTheme(
      <Inpult placeholder="text" type="text" value="aaa" onChange={fn} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
