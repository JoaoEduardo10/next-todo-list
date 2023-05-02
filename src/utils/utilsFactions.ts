import { TTasks } from '../types';

const returnedSubTasksConcluded = (task: TTasks) => {
  const allSubTaskConcluded =
    task.subTasks &&
    task.subTasks.filter((subTask) => {
      return subTask.concluded == true;
    });

  return allSubTaskConcluded?.length;
};

export { returnedSubTasksConcluded };
