import { TSubTasks } from '@/src/types';
import * as S from './styles';
import { Inpult } from '../../inpult/inpult';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export type SubTasksProps = {
  setSubTasks: React.Dispatch<React.SetStateAction<TSubTasks[]>>;
};

export const SubTasks = ({ setSubTasks }: SubTasksProps) => {
  const [inputs, setInputs] = useState<string[]>(['']);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = event.target;
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleAddInput = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setInputs([...inputs, '']);
  };

  const handleCloseInput = (index: number) => {
    const newInput = [...inputs];

    const getInputId = newInput.findIndex((_input, indexF) => {
      return indexF == index;
    });

    newInput.splice(getInputId, 1);
    setInputs([...newInput]);
  };

  useEffect(() => {
    const subTasks = inputs.map((input) => ({
      text: input,
    }));

    setSubTasks(subTasks);
  }, [inputs, setSubTasks]);

  return (
    <S.Conteiner>
      <S.ConteinerAllInputs>
        {inputs.map((input, index) => (
          <S.ConteinerInput key={index}>
            <S.Input
              placeholder="Nome da tarefa"
              name={input}
              type="text"
              onChange={(Event) => handleInputChange(Event, index)}
            />
            <span onClick={() => handleCloseInput(index)}>
              <AiOutlineClose aria-label="Delete SubTarefa" />
            </span>
          </S.ConteinerInput>
        ))}
      </S.ConteinerAllInputs>
      <button onClick={handleAddInput}>Adicionar Nova SubTarefa</button>{' '}
    </S.Conteiner>
  );
};
