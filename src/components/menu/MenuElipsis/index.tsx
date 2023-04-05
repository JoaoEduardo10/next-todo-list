import { useEffect, useState } from 'react';
import { Button } from '../../button';
import * as S from './styles';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { act } from 'react-dom/test-utils';
import { Session } from 'next-auth';

export type MenuElipsisProps = {
  show: boolean;
  setMenuElipsis: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuElipsis = ({ show, setMenuElipsis }: MenuElipsisProps) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setRendered(true);
    }, 1000);

    return clearTimeout(time);
  }, []);

  const handleMenuElipsiEditClick = () => {
    setMenuElipsis(false);
  };

  const handleMenuElipsiDeleteClick = () => {
    setMenuElipsis(false);
  };

  const handleSignOut = () => {
    signOut({ redirect: true });
  };

  return (
    <S.Conteiner aria-label="MenuElipsis" show={show} rendered={rendered}>
      <S.Paragraph
        aria-label="Editar Quadro"
        onClick={handleMenuElipsiEditClick}
      >
        Editar Quadro
      </S.Paragraph>
      <S.Paragraph
        aria-label="Deletar Quadro"
        onClick={handleMenuElipsiDeleteClick}
      >
        Deletar Quadro
      </S.Paragraph>
      <div aria-label="Conteiner Button">
        <Button handleOnClick={handleSignOut}>Sair</Button>
      </div>
    </S.Conteiner>
  );
};
