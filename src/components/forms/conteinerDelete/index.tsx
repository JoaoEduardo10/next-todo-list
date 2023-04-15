import * as S from './styles';
import { Button } from '../../button';

export type ConteinerDeleteProps = {
  showDelete: boolean;
  rendered: boolean;
  textHeading: string;
  textParagraph: string;
  onClickButtonCancel: () => void;
  onClickButtonDelete: () => void;
};

export const ConteinerDelete = ({
  showDelete,
  rendered,
  textHeading,
  textParagraph,
  onClickButtonCancel,
  onClickButtonDelete,
}: ConteinerDeleteProps) => {
  return (
    <S.Conteiner show={showDelete} rendered={rendered}>
      <S.ConteinerDelete>
        <S.Heading>{textHeading}</S.Heading>
        <S.Paragraph>{textParagraph}</S.Paragraph>
        <S.ConteinerButton>
          <Button handleOnClick={onClickButtonDelete}>Excluir</Button>
          <Button handleOnClick={onClickButtonCancel}>Cancelar</Button>
        </S.ConteinerButton>
      </S.ConteinerDelete>
    </S.Conteiner>
  );
};
