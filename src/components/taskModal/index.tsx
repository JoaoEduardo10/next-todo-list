import { TTasks } from '@/src/types';
import * as S from './styles';
import { Heading } from '../forms/createTask/styles';
import { AiOutlineClose } from 'react-icons/ai';
import { FaEllipsisV } from 'react-icons/fa';
import { SubTasksModal } from '../subTasksModal';
import { TaskStatus } from '../taskStatus';
import { MenuElipsisTask } from '../menu/MenuElipsisTask';
import { useState } from 'react';

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
  const [openMenu, setOpenMenu] = useState(false);

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
    setOpenMenu(false);
  };

  const handleOpenMenuElipisiTask = () => {
    setOpenMenu((eventMenu) => !eventMenu);
  };

  return (
    <>
      <MenuElipsisTask
        closeMenu={setOpenMenu}
        setShowTaskModal={setShowTaskModal}
        rendered={rendering}
        show={openMenu}
      />
      <S.Conteiner show={show} rendering={rendering}>
        <S.TaskModal>
          <Heading>
            {actualTasks?.text ?? ''}{' '}
            <span>
              <FaEllipsisV
                aria-label="Open/Elipsis"
                onClick={handleOpenMenuElipisiTask}
              />
              <AiOutlineClose
                aria-label="Close CreateTask"
                onClick={handleCloseTaskModal}
              />
            </span>
          </Heading>
          <SubTasksModal subTasks={actualTasks?.subTasks ?? []} />
          <TaskStatus
            rendered={rendering}
            status={actualTasks?.status!}
            update={show}
          />
        </S.TaskModal>
      </S.Conteiner>
    </>
  );
};
