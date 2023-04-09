import { TTasks } from '../types';

const returnedSubTasksConcluded = (task: TTasks) => {
  const allSubTaskConcluded = task.subTasks.filter((total) => {
    return total.concluded == true;
  });

  return allSubTaskConcluded.length;
};

export { returnedSubTasksConcluded };
