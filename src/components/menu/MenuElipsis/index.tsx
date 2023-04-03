import * as S from './styles';

export type MenuElipsisProps = {
  show: boolean;
};

export const MenuElipsis = ({ show }: MenuElipsisProps) => {
  return (
    <S.Conteiner show={show}>
      <S.Paragraph>Editar Quadro</S.Paragraph>
      <S.Paragraph>Deletar Quadro</S.Paragraph>
    </S.Conteiner>
  );
};
