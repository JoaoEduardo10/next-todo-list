import { useState } from 'react';
import { ConteinerDelete } from '../../forms/conteinerDelete';
import * as S from '../MenuElipsisHeader/styles';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { useSession } from 'next-auth/react';
import { TSession } from '../../modal';
import { deleteTask } from '@/src/utils/fecths';
import { removeTask } from '@/src/app/features/Boards/boardSlice';
import { deleteActualTask } from '@/src/app/features/tasks/tasksSlice';
import { UpdateTask } from '../../forms/updateTask';

export type MenuElipsisTaskProps = {
  show: boolean;
  rendered: boolean;
  closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuElipsisTask = ({
  rendered,
  show,
  closeMenu,
  setShowTaskModal,
}: MenuElipsisTaskProps) => {
  const { data: Session } = useSession() as TSession;
  const task = useAppSelector((store) => store.task.actualTask);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [openFormUpdateTask, setOpenFormUpdateTask] = useState(false);

  const handleButtonCancelDelete = () => {
    setShowDelete(false);
  };

  const handleButtonDelete = async () => {
    setLoading(true);
    await deleteTask(Session.acessToken, task._id as string);
    dispatch(removeTask({ task }));
    dispatch(deleteActualTask());
    setLoading(false);
    closeMenu(false);
    setShowTaskModal(false);
  };

  const handleMenuElipsiEditClick = () => {
    setOpenFormUpdateTask(true);
  };

  const handleMenuElipsiDeleteClick = () => {
    setShowDelete(true);
  };

  return (
    <>
      <UpdateTask
        rendering={rendered}
        setOpenFormUpdateTask={setOpenFormUpdateTask}
        show={openFormUpdateTask}
      />
      <S.Conteiner
        style={{ left: '60%', top: '33%' }}
        rendered={rendered}
        show={show}
      >
        <ConteinerDelete
          loading={loading}
          showDelete={showDelete}
          rendered={rendered}
          textHeading="Excluir esta task?"
          textParagraph={`Tem certeza de que deseja excluir a task " ${task.text} "? Esta ação removerá a tarefa e não pode ser revertida.`}
          onClickButtonCancel={handleButtonCancelDelete}
          onClickButtonDelete={handleButtonDelete}
        />
        <S.Paragraph
          aria-label="Editar Quadro"
          onClick={handleMenuElipsiEditClick}
        >
          Editar Task
        </S.Paragraph>
        <S.Paragraph
          aria-label="Deletar Quadro"
          onClick={handleMenuElipsiDeleteClick}
        >
          Deletar Task
        </S.Paragraph>
      </S.Conteiner>
    </>
  );
};
