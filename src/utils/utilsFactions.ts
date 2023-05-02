import { TSubTasks, TTasks } from '../types';

const returnedSubTasksConcluded = (subTask: TSubTasks[]) => {
  const allSubTaskConcluded = subTask.filter((subTask) => {
    return subTask.concluded == true;
  });

  return allSubTaskConcluded?.length;
};

export { returnedSubTasksConcluded };
