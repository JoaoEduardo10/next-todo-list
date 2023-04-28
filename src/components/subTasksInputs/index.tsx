import { TSubTasks } from '../../types';
import * as S from './styles';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export type SubTasksInputsProps = {
  setSubTasks: React.Dispatch<React.SetStateAction<TSubTasks[]>>;
  clearInput: boolean;
  actualSubTasks?: TSubTasks[];
};

export const SubTasksInputs = ({
  setSubTasks,
  clearInput,
  actualSubTasks,
}: SubTasksInputsProps) => {
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
    if (actualSubTasks && actualSubTasks.length > 0) {
      const subTasksText: string[] = [];

      actualSubTasks.map((subTask) => {
        subTasksText.push(subTask.text);
      });

      setInputs([...subTasksText]);
    }
  }, []);

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
    <S.Conteiner role="listbox">
      <S.ConteinerAllInputs role="list">
        {inputs.map((input, index) => (
          <S.ConteinerInput key={`input ${index}`} role="listitem">
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
