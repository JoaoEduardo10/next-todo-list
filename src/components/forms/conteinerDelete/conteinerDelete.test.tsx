import { fireEvent, screen } from '@testing-library/react';
import { ConteinerDelete } from '.';
import { renderTheme } from '../../../utils/render-theme';

describe('<ConteinerDelete />', () => {
  const buttonCancel = jest.fn();
  const buttonDelete = jest.fn();

  it('should rende  conteinerDelete component', () => {
    renderTheme(
      <ConteinerDelete
        loading={false}
        rendered={true}
        textHeading="test"
        textParagraph="test paragraph"
        onClickButtonCancel={buttonCancel}
        onClickButtonDelete={buttonDelete}
        showDelete={true}
      />,
    );

    const conteinerDelete = screen.getByLabelText('conteinerDelete');
    const loading = screen.queryByLabelText('Loading');
    const heading = screen.getByText('test');
    const paragraph = screen.getByText('test paragraph');
    const buttons = screen.getAllByRole('button');

    expect(conteinerDelete).toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('test');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('test paragraph');
    expect(buttons.length).toBe(2);
  });

  it('should rende  Loading component', () => {
    renderTheme(
      <ConteinerDelete
        loading={true}
        rendered={true}
        textHeading="test"
        textParagraph="test paragraph"
        onClickButtonCancel={buttonCancel}
        onClickButtonDelete={buttonDelete}
        showDelete={true}
      />,
    );

    const conteinerDelete = screen.getByLabelText('conteinerDelete');
    const loading = screen.getByLabelText('Loading');

    expect(conteinerDelete).toBeInTheDocument();
    expect(loading).toBeInTheDocument();
  });

  it('should not render conteinerDelete component', () => {
    renderTheme(
      <ConteinerDelete
        loading={false}
        rendered={true}
        textHeading="test"
        textParagraph="test paragraph"
        onClickButtonCancel={buttonCancel}
        onClickButtonDelete={buttonDelete}
        showDelete={false}
      />,
    );

    const conteinerDelete = screen.getByLabelText('conteinerDelete');

    expect(conteinerDelete).toHaveStyle({
      visibility: 'hidden',
    });
  });

  it('should delete the board on click', () => {
    renderTheme(
      <ConteinerDelete
        loading={false}
        rendered={true}
        textHeading="test"
        textParagraph="test paragraph"
        onClickButtonCancel={buttonCancel}
        onClickButtonDelete={buttonDelete}
        showDelete={true}
      />,
    );

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(2);

    expect(buttons[0]).toHaveTextContent('Excluir');

    fireEvent.click(buttons[0]);

    expect(buttonDelete).toHaveBeenCalledTimes(1);
  });

  it('should cancel the board on click', () => {
    renderTheme(
      <ConteinerDelete
        loading={false}
        rendered={true}
        textHeading="test"
        textParagraph="test paragraph"
        onClickButtonCancel={buttonCancel}
        onClickButtonDelete={buttonDelete}
        showDelete={true}
      />,
    );

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(2);

    expect(buttons[1]).toHaveTextContent('Cancelar');

    fireEvent.click(buttons[1]);

    expect(buttonDelete).toHaveBeenCalledTimes(1);
  });
});
