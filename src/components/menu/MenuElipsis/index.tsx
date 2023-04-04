import { useEffect, useState } from 'react';
import { Button } from '../../button';
import * as S from './styles';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export type MenuElipsisProps = {
  show: boolean;
  setMenuElipsis: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuElipsis = ({ show, setMenuElipsis }: MenuElipsisProps) => {
  const router = useRouter();
  const [rendered, setRendered] = useState(false);
  const { data: Session } = useSession();

  useEffect(() => {
    let time: NodeJS.Timeout;

    if (!show) {
      time = setTimeout(() => {
        setRendered(true);
      }, 1000);
    }

    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    if (!Session) {
      router.push('/');
    }
  }, [Session]);

  const handleMenuElipsiEditClick = () => {
    setMenuElipsis(false);
  };

  const handleMenuElipsiDeleteClick = () => {
    setMenuElipsis(false);
  };

  const handleSignOut = () => {
    signOut({ redirect: false });
  };

  return (
    <S.Conteiner aria-label="MenuElipsis" show={show} rendered={rendered}>
      <S.Paragraph onClick={handleMenuElipsiEditClick}>
        Editar Quadro
      </S.Paragraph>
      <S.Paragraph onClick={handleMenuElipsiDeleteClick}>
        Deletar Quadro
      </S.Paragraph>
      <div aria-label="Conteiner Button">
        <Button handleOnClick={handleSignOut}>Sair</Button>
      </div>
    </S.Conteiner>
  );
};
