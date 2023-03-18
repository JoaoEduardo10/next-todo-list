import * as S from './styles';
import { SetStateAction, useState } from 'react';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdDriveFileRenameOutline, MdEmail } from 'react-icons/md';

export type TInpultProps = {
  placeholder: string;
  type: 'email' | 'password' | 'text';
  onChange?: React.Dispatch<SetStateAction<string>>;
  value?: string;
  messagerError?: string;
};

export const Inpult = ({
  placeholder,
  type,
  onChange,
  value,
  messagerError,
}: TInpultProps) => {
  const [visibiletPassword, setVisibiletPassword] = useState(false);
  const [animation, setAnimation] = useState(false);

  // validação para mostrar a senha
  const isPassowrd =
    type == 'password' && !visibiletPassword ? 'password' : 'text';

  //type do input
  const isTypePassword = type == 'password' ? isPassowrd : type;

  const handleChange = (valueInput: string) => {
    if (onChange) {
      onChange(valueInput);
    }
  };

  const isError = !!messagerError;

  return (
    <S.Label
      aria-label="Label conteiner"
      animation={animation}
      htmlFor={isTypePassword}
      error={isError}
    >
      <S.input
        placeholder={placeholder}
        type={isTypePassword}
        id={isTypePassword}
        value={value}
        onFocus={() => setAnimation(true)}
        onBlur={() => setAnimation(false)}
        onChange={({ target }) => handleChange(target.value)}
      />

      {/* mostra apenas o icons de passowrd */}
      {type == 'password' &&
        // validação para mosta a senha e esconder a senha
        (visibiletPassword ? (
          <AiFillEye
            aria-label="Password open"
            onClick={() => setVisibiletPassword(false)}
          />
        ) : (
          <AiFillEyeInvisible
            aria-label="Password close"
            onClick={() => setVisibiletPassword(true)}
          />
        ))}

      {/* mostra os icons do input de text */}
      {type == 'text' && <MdDriveFileRenameOutline />}

      {/* mostra os icon de email */}
      {type == 'email' && <MdEmail />}
    </S.Label>
  );
};
