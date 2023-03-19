import { screen } from '@testing-library/react';
import { MessageError } from '.';
import { renderTheme } from '../../utils/render-theme';

describe('<MessageError />', () => {
  it('should show the message but the animation of showMessage', () => {
    renderTheme(<MessageError text="Test Error" error={true} />);

    const message = screen.queryByLabelText('Message Error');

    expect(message).toBeInTheDocument();
    expect(message).toHaveStyle({
      animation: 'showMessage 300ms ease-in-out',
    });
  });

  it('should hiden the error message with animation errorMessageNotExist', () => {
    renderTheme(<MessageError text="Test Error" error={false} />);

    const message = screen.queryByLabelText('Message Error');

    expect(message).toBeInTheDocument();
    expect(message).toHaveStyle({
      animation: 'hidenShowMessageError 1s ease-in-out',
    });
  });

  it('should create to Match Snapshot', () => {
    renderTheme(<MessageError text="Test Error" error={false} />);

    const message = screen.queryByLabelText('Message Error');

    expect(message).toMatchSnapshot();
  });
});
