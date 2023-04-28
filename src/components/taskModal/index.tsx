import { TTasks } from '@/src/types';
import * as S from './styles';
import { Heading } from '../forms/createTask/styles';
import { AiOutlineClose } from 'react-icons/ai';
import { FaEllipsisV } from 'react-icons/fa';

export type TasksModalProps = {
  actualTasks: TTasks;
  show: boolean;
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  rendering: boolean;
};

export const TasksModal = ({
  actualTasks,
  setShowTaskModal,
  show,
  rendering,
}: TasksModalProps) => {
  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
  };

  return (
    <S.Conteiner show={show} rendering={rendering}>
      <S.TaskModal>
        <Heading>
          {actualTasks && actualTasks.text}{' '}
          <span>
            <FaEllipsisV aria-label="Open/Elipsis" />
            <AiOutlineClose
              aria-label="Close CreateTask"
              onClick={handleCloseTaskModal}
            />
          </span>
        </Heading>
      </S.TaskModal>
    </S.Conteiner>
  );
};
