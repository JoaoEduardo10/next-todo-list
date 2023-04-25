import { TSubTasks } from '../../types';
import * as S from './styles';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export type SubTasksProps = {
  setSubTasks: React.Dispatch<React.SetStateAction<TSubTasks[]>>;
  clearInput: boolean;
};

export const SubTasks = ({ setSubTasks, clearInput }: SubTasksProps) => {
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

    const getInputIndex = newInput.findIndex((_input, indexFunction) => {
      return indexFunction == index;
    });

    newInput.splice(getInputIndex, 1);
    setInputs([...newInput]);
  };

  useEffect(() => {
    const subTasks = inputs.map((input) => ({
      text: input,
    }));

    setSubTasks(subTasks);
  }, [inputs, setSubTasks]);

  useEffect(() => {
    if (clearInput) {
      setInputs(['']);
    }
  }, [clearInput]);

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
              value={input}
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
