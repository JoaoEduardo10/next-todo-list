import * as S from './styles';
import { AiFillInfoCircle } from 'react-icons/ai';

export type MessageErrorProps = {
  text: string;
  error: boolean;
};

export const MessageError = ({ text, error }: MessageErrorProps) => {
  return (
    <S.MessageError aria-label="Message Error" messageError={error}>
      {' '}
      <span>
        <AiFillInfoCircle />
      </span>{' '}
      {text}
    </S.MessageError>
  );
};
